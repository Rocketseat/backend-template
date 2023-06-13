/**
 * Replaces the property definitions from a given type
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 * }
 *
 * Replace<Post, {id: number}>
 * ```
 **/

export type Replace<T, R> = Omit<T, keyof R> & R;
