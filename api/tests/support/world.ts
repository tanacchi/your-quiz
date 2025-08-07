import { setWorldConstructor, World } from "@cucumber/cucumber";

export interface TestWorld extends World {
  // API testing context
  lastResponse: Response | null;
  lastResponseBody: unknown;
  testData: Record<string, unknown>;
  apiBaseUrl: string;

  // Helper methods
  makeRequest(method: string, path: string, body?: unknown): Promise<Response>;
  parseResponse(): Promise<unknown>;
  validateSchema<T>(data: unknown, expectedType: string): T;
  setupTestData(): Promise<void>;
  cleanupTestData(): Promise<void>;
}

export class CustomWorld extends World implements TestWorld {
  lastResponse: Response | null = null;
  lastResponseBody: unknown = null;
  testData: Record<string, unknown> = {};
  apiBaseUrl = "http://localhost:8787"; // Wrangler dev server default

  async makeRequest(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<Response> {
    const url = `${this.apiBaseUrl}${path}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }

    this.lastResponse = await fetch(url, options);
    return this.lastResponse;
  }

  async parseResponse(): Promise<unknown> {
    if (!this.lastResponse) {
      throw new Error("No response available to parse");
    }

    try {
      this.lastResponseBody = await this.lastResponse.json();
      return this.lastResponseBody;
    } catch (_error) {
      // Handle non-JSON responses
      this.lastResponseBody = await this.lastResponse.text();
      return this.lastResponseBody;
    }
  }

  validateSchema<T>(data: unknown, expectedType: string): T {
    // Basic type validation - can be enhanced with Zod schemas
    if (typeof data !== "object" || data === null) {
      throw new Error(
        `Expected object for ${expectedType}, got ${typeof data}`,
      );
    }
    return data as T;
  }

  async setupTestData(): Promise<void> {
    // Setup sample data for tests
    this.testData = {
      sampleQuizzes: [
        {
          id: "test-quiz-1",
          question: "Is TypeScript strongly typed?",
          answerType: "boolean",
          solution: {
            type: "boolean",
            id: "sol-1",
            value: true,
          },
          explanation: "TypeScript is indeed strongly typed",
          status: "approved",
          creatorId: "creator-1",
          createdAt: new Date().toISOString(),
          approvedAt: new Date().toISOString(),
        },
      ],
    };
  }

  async cleanupTestData(): Promise<void> {
    this.lastResponse = null;
    this.lastResponseBody = null;
    this.testData = {};
  }
}

setWorldConstructor(CustomWorld);
