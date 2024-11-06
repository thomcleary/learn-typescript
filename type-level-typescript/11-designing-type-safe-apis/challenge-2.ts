/**
 *  Make sure `isAuthenticated()` and  `isAdmin()`
 *  are always used correctly!
 */

route("GET /tricks/:trickId/details")
  .isAuthenticated()
  // @ts-expect-error ❌ already authenticated.
  .isAuthenticated();

route("GET /admin/dashboard")
  // @ts-expect-error ❌ not authenticated.
  .isAdmin();

route("GET /admin/dashboard")
  .isAuthenticated()
  .isAdmin()
  // @ts-expect-error ❌ already admin.
  .isAdmin();

route("GET /admin/dashboard")
  .isAuthenticated()
  .isAdmin()
  .handle(() => `📈`); // ✅

/**
 * Modify the `route` function and its methods 👇
 */

// Use these error messages
type SeveralAuthError = ".isAuthenticated() can only be called once.";
type SeveralAdminError = ".isAdmin() can only be called once.";
type UnauthenticatedAdminError =
  "You must call .isAuthenticated() before .isAdmin().";

type RouteStateConstraint = {
  method: Method;
  isValid: boolean;
  // 1. Add state
  isAuthenticated: boolean;
  isAdmin: boolean;
  body: unknown;
};

type InitialRouteState<Path, Body> = {
  method: GetMethod<Path>;
  isValid: GetMethod<Path> extends "GET" ? true : false;
  // 2. Add default state
  isAuthenticated: false;
  isAdmin: false;
  body: Body;
};

declare function route<const Path extends string>(
  path: Path,
): Route<InitialRouteState<Path, unknown>>;

type Route<State extends RouteStateConstraint> = {
  isAuthenticated: IsAuthenticatedMethod<State>;
  isAdmin: IsAdminMethod<State>;
  validateBody: ValidateBodyMethod<State>;
  handle: HandleMethod<State>;
};

type IsAuthenticatedMethod<State extends RouteStateConstraint> =
  // 3. Check if isAuthenticated has already been called
  State["isAuthenticated"] extends true
    ? SeveralAuthError
    : () => Route<Assign<State, { isAuthenticated: true }>>;

type IsAdminMethod<State extends RouteStateConstraint> =
  // 4. Check if isAuthenticated has been called first
  State["isAuthenticated"] extends false
    ? UnauthenticatedAdminError
    : // 5. Check if isAdmin has already been called
      State["isAdmin"] extends true
      ? SeveralAdminError
      : () => Route<Assign<State, { isAdmin: true }>>;

/**
 * Helper types and functions
 */

type ValidateBodyMethod<State extends RouteStateConstraint> =
  State["method"] extends "GET"
    ? GETBodyError
    : <Body>(
        isValid: (body: unknown) => body is Body,
      ) => Route<Assign<State, { isValid: true; body: Body }>>;

type ParsedRequest<Body> = {
  cookies: Record<string, string>;
  params: Record<string, string>;
  body: Body;
};

type HandleMethod<State extends RouteStateConstraint> =
  State["isValid"] extends false
    ? UnvalidatedBodyError<State["method"]>
    : (
        fn: (req: ParsedRequest<State["body"]>) => string | Promise<string>,
      ) => Route<State>;

type Method = "GET" | "POST" | "PUT" | "PATCH";

type GetMethod<P> = P extends `${infer M extends Method} ${string}` ? M : never;

type Assign<A, B> = Compute<Omit<A, keyof B> & B>;

type GETBodyError = ".validateBody(...) isn't available on GET routes.";

type UnvalidatedBodyError<M extends Method> =
  `You must call .validateBody(...) before .handle(...) on ${M} routes.`;

export {};
