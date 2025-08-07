import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import type { TestWorld } from "./world.js";

BeforeAll(async () => {
  console.log("🚀 Starting BDD test suite");
  // Global setup if needed
});

AfterAll(async () => {
  console.log("✅ BDD test suite completed");
  // Global teardown if needed
});

Before(async function (this: TestWorld) {
  // Setup test data for each scenario
  await this.setupTestData();
});

After(async function (this: TestWorld, scenario) {
  // Cleanup after each scenario
  await this.cleanupTestData();

  if (scenario.result?.status === "FAILED") {
    // Log failure details
    console.log(`❌ Scenario failed: ${scenario.pickle.name}`);
    if (this.lastResponse) {
      console.log(`Last response status: ${this.lastResponse.status}`);
      console.log(`Last response body:`, this.lastResponseBody);
    }
  }
});
