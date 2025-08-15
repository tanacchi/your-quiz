export const isObjectLike = <T>(input: unknown): input is Partial<T> => {
  return typeof input === "object" && input !== null;
};
