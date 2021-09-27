export type ByOptional<T> = Pick<
  T,
  Exclude<
    {
      [Key in keyof T]: T extends Record<Key, T[Key]> ? never : Key;
    }[keyof T],
    undefined
  >
>;
