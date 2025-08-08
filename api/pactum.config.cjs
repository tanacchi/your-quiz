// PactumJS configuration for API testing

module.exports = {
  // Base configuration for PactumJS
  baseUrl: "http://localhost:8787",

  // Test configuration
  timeout: 30000,

  // Future: OpenAPI/Swagger Coverage configuration
  // Will be configured when proper swagger coverage package is available
  coverage: {
    enabled: false, // Will enable when @pactum/swagger-coverage is available
    output: "coverage/swagger",
    spec: "spec/openapi.yaml",
  },
};
