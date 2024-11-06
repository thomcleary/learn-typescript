/**
 *  Make the `body` parameter type-safe!
 *  Given the following predicates:
 */
declare const isComment: (x: unknown) => x is Comment;
declare const isVideo: (x: unknown) => x is Video;

/* `body` should be correctly narrowed:  */
route("POST /comments")
  .validateBody(isComment)
  .handle(({ body }) => {
    type test = Expect<Equal<typeof body, Comment>>;
    return "✅";
  });

route("PUT /video/:id")
  .validateBody(isVideo)
  .handle(({ body }) => {
    type test = Expect<Equal<typeof body, Video>>;
    return "✅";
  });

/**
 * Modify the `route` function and its methods
 * to keep track of the type of `body`! 👇
 */

type RouteStateConstraint = {
  method: Method;
  isValid: boolean;
  body: unknown; // 1. Add body type to state
};

type InitialRouteState<P> = {
  method: GetMethod<P>;
  isValid: GetMethod<P> extends "GET" ? true : false;
  body: unknown; // 2. Set initial type of body
};

declare function route<const P extends string>(
  path: P,
): Route<InitialRouteState<P>>;

/*
   We have extracted the types of `handle` and `validateBody`
   to separate generic types for readability:              */
type Route<State extends RouteStateConstraint> = {
  isAuthenticated: () => Route<State>;
  isAdmin: () => Route<State>;

  validateBody: ValidateBodyMethod<State>;
  handle: HandleMethod<State>;
};

type ValidateBodyMethod<State extends RouteStateConstraint> =
  State["method"] extends "GET"
    ? GETBodyError
    : <T>( // 3. Infer predicate type and assign to body
        isValid: (body: unknown) => body is T,
      ) => Route<Assign<State, { isValid: true; body: T }>>;

type ParsedRequest<Body> = {
  cookies: Record<string, string>;
  params: Record<string, string>;
  body: Body;
};

type HandleMethod<State extends RouteStateConstraint> =
  State["isValid"] extends false
    ? UnvalidatedBodyError<State["method"]>
    : (
        // 4. Use inferred body type
        fn: (req: ParsedRequest<State["body"]>) => string | Promise<string>,
      ) => Route<State>;

/**
 * Helper types and functions
 */

type Comment = { content: string; author: string };

type Video = { src: string; title: string };

type Method = "GET" | "POST" | "PUT" | "PATCH";

type GetMethod<P> = P extends `${infer M extends Method} ${string}` ? M : never;

type Assign<A, B> = Compute<Omit<A, keyof B> & B>;

type GETBodyError = ".validateBody(...) isn't available on GET routes.";

type UnvalidatedBodyError<M extends Method> =
  `You must call .validateBody(...) before .handle(...) on ${M} routes.`;

export {};
