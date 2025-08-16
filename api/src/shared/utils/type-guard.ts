/**
 * Checks if the input is an object-like value (i.e., not null and of type "object").
 * @param input The value to check.
 * @returns True if the input is object-like, false otherwise.
 */
export const isObjectLike = <T>(input: unknown): input is Partial<T> => {
  return typeof input === "object" && input !== null;
};
