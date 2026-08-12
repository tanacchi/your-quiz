import { httpGet, httpPost } from "./http";

const jsonResponse = (
  body: unknown,
  init?: Partial<{ status: number; statusText: string }>,
): Response =>
  new Response(JSON.stringify(body), {
    status: init?.status ?? 200,
    statusText: init?.statusText ?? "OK",
    headers: { "content-type": "application/json" },
  });

describe("http", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.test");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  describe("httpGet", () => {
    it("2xx の JSON レスポンスを ok として返す", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValueOnce(jsonResponse({ id: "1" }));

      const result = await httpGet<{ id: string }>("/quizzes/1");

      expect(result.isOk()).toBe(true);
      expect(result._unsafeUnwrap()).toEqual({ id: "1" });
    });

    it("NEXT_PUBLIC_API_URL とパスを結合してリクエストする", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValueOnce(jsonResponse({ ok: true }));

      await httpGet("/quizzes");

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.example.test/quizzes",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("204 No Content を ok(null) として返す", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValueOnce(
        new Response(null, { status: 204, statusText: "No Content" }),
      );

      const result = await httpGet("/quizzes/1");

      expect(result.isOk()).toBe(true);
      expect(result._unsafeUnwrap()).toBeNull();
    });

    it("4xx はエラーボディを http エラーとして返しリトライしない", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValueOnce(
        jsonResponse(
          { code: 404, message: "Not Found" },
          { status: 404, statusText: "Not Found" },
        ),
      );

      const result = await httpGet("/quizzes/unknown");

      expect(result.isErr()).toBe(true);
      const error = result._unsafeUnwrapErr();
      expect(error).toEqual({
        kind: "http",
        status: 404,
        body: { code: 404, message: "Not Found" },
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("非 2xx でボディが ApiErrorBody 形でない場合は unexpectedResponse を返す", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValue(
        new Response("<html>error</html>", {
          status: 502,
          statusText: "Bad Gateway",
        }),
      );

      const result = await httpGet("/quizzes", { retry: { max: 0 } });

      expect(result.isErr()).toBe(true);
      const error = result._unsafeUnwrapErr();
      expect(error.kind).toBe("unexpectedResponse");
      if (error.kind === "unexpectedResponse") {
        expect(error.status).toBe(502);
      }
    });

    it("5xx はリトライ回数の上限まで再試行してから err を返す", async () => {
      const fetchMock = vi.mocked(fetch);
      // Response は Body を一度しか読めないため、呼び出しごとに新規生成する
      fetchMock.mockImplementation(() =>
        Promise.resolve(
          jsonResponse(
            { code: 500, message: "Internal Server Error" },
            { status: 500, statusText: "Internal Server Error" },
          ),
        ),
      );

      const result = await httpGet("/quizzes", {
        retry: { max: 2, baseDelayMs: 0 },
      });

      expect(result.isErr()).toBe(true);
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("ネットワーク例外を network エラーとして返す", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

      const result = await httpGet("/quizzes", { retry: { max: 0 } });

      expect(result.isErr()).toBe(true);
      const error = result._unsafeUnwrapErr();
      expect(error.kind).toBe("network");
      if (error.kind === "network") {
        expect(error.message).toBe("Failed to fetch");
      }
    });

    it("Error インスタンスでない値が reject された場合も network エラーとして返す", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockRejectedValue("network down");

      const result = await httpGet("/quizzes", { retry: { max: 0 } });

      expect(result.isErr()).toBe(true);
      const error = result._unsafeUnwrapErr();
      expect(error.kind).toBe("network");
      if (error.kind === "network") {
        expect(error.message).toBe("ネットワークエラーが発生しました");
      }
    });

    it("AbortError をタイムアウトとして返す", async () => {
      const fetchMock = vi.mocked(fetch);
      const abortError = new DOMException(
        "The operation was aborted",
        "AbortError",
      );
      fetchMock.mockRejectedValue(abortError);

      const result = await httpGet("/quizzes", { retry: { max: 0 } });

      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().kind).toBe("timeout");
    });

    it("2xx で JSON パースに失敗した場合は parse エラーを返す", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValueOnce(
        new Response("not json", {
          status: 200,
          statusText: "OK",
          headers: { "content-type": "application/json" },
        }),
      );

      const result = await httpGet("/quizzes");

      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().kind).toBe("parse");
    });
  });

  describe("httpPost", () => {
    it("body を JSON 化して POST する", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ id: "new" }, { status: 201 }),
      );

      const result = await httpPost<{ id: string }>("/quizzes", {
        body: { question: "五角形の内角の和は？" },
      });

      expect(result.isOk()).toBe(true);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.example.test/quizzes",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ question: "五角形の内角の和は？" }),
        }),
      );
    });

    it("4xx は POST でもリトライしない", async () => {
      const fetchMock = vi.mocked(fetch);
      fetchMock.mockResolvedValueOnce(
        jsonResponse(
          { code: 400, message: "Bad Request" },
          { status: 400, statusText: "Bad Request" },
        ),
      );

      const result = await httpPost("/quizzes", { body: {} });

      expect(result.isErr()).toBe(true);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
