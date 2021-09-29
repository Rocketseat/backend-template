/**
 * This is the oposite of Pick, used to make a single property as optional
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 * }
 *
 * PickOut<Post, 'name'>
 * ```
 */
export type PickOut<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;
