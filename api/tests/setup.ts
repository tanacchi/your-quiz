import * as pactum from "pactum";

// Extend global namespace for Jest
declare global {
  var lastPactumResponse: unknown;
}

// PactumJS global setup
beforeAll(() => {
  // Set base URL for all API calls
  // BDDの各vitest設定が `test.env.BDD_BASE_URL` でターゲットのURLを渡す。
  // unitテスト（vitest.config.ts）も本ファイルを読み込むため、未設定時は
  // 従来どおりMockターゲットのURLにする。
  pactum.request.setBaseUrl(
    process.env["BDD_BASE_URL"] ?? "http://localhost:8787",
  );

  // Set default timeout
  pactum.request.setDefaultTimeout(30000);

  // Future: Add OpenAPI Swagger Coverage handler
  // pactum.handler.addSpecHandler('swagger', swaggerCoverageHandler);
  // This will be configured when proper swagger coverage package is available
});

// Global test setup
beforeEach(() => {
  // Clear any global state between tests
  global.lastPactumResponse = null;
});

afterEach(() => {
  // Store last response for error diagnostics
  // This can be used in error handling
});

afterAll(() => {
  // Cleanup after all tests
});
