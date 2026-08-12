import { isApiErrorBody } from "./api";

describe("isApiErrorBody", () => {
  it("code と message を持つオブジェクトを true と判定する", () => {
    expect(isApiErrorBody({ code: 404, message: "Not Found" })).toBe(true);
  });

  it("details / requestId / fieldErrors を含むオブジェクトを true と判定する", () => {
    expect(
      isApiErrorBody({
        code: 400,
        message: "Validation failed",
        details: "id is required",
        requestId: "req-1",
        fieldErrors: { question: "required" },
      }),
    ).toBe(true);
  });

  it("code が number でない場合は false を返す", () => {
    expect(isApiErrorBody({ code: "404", message: "Not Found" })).toBe(false);
  });

  it("message が string でない場合は false を返す", () => {
    expect(isApiErrorBody({ code: 404, message: 123 })).toBe(false);
  });

  it("details が string でない場合は false を返す", () => {
    expect(isApiErrorBody({ code: 400, message: "x", details: 1 })).toBe(false);
  });

  it("requestId が string でない場合は false を返す", () => {
    expect(isApiErrorBody({ code: 400, message: "x", requestId: 1 })).toBe(
      false,
    );
  });

  it("fieldErrors がオブジェクトでない場合は false を返す", () => {
    expect(
      isApiErrorBody({ code: 400, message: "x", fieldErrors: "invalid" }),
    ).toBe(false);
  });

  it("null を false と判定する", () => {
    expect(isApiErrorBody(null)).toBe(false);
  });

  it("オブジェクトでない値を false と判定する", () => {
    expect(isApiErrorBody("error")).toBe(false);
    expect(isApiErrorBody(42)).toBe(false);
    expect(isApiErrorBody(undefined)).toBe(false);
  });

  it("code / message を欠くオブジェクトを false と判定する", () => {
    expect(isApiErrorBody({})).toBe(false);
    expect(isApiErrorBody({ code: 404 })).toBe(false);
    expect(isApiErrorBody({ message: "x" })).toBe(false);
  });
});
