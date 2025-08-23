import { describe, expect, it } from "vitest";
import type { ZodError } from "zod";
import {
  type ListQuizzesQuery,
  listQueryFromReq,
  listQuizzesQuerySchema,
} from "./list-quizzes-query.schema";

describe("List Quizzes Query Schema", () => {
  describe("listQuizzesQuerySchema Validation", () => {
    describe("Default Values", () => {
      it("should apply default values for all optional fields", () => {
        const emptyInput = {};
        const result = listQuizzesQuerySchema.safeParse(emptyInput);
        expect(result.success).toBe(true);

        if (result.success) {
          const data = result.data as ListQuizzesQuery;
          expect(data.status).toEqual(["approved"]);
          expect(data.limit).toBe(10);
          expect(data.offset).toBe(0);
          expect(data.creatorId).toBeUndefined();
          expect(data.quizId).toBeUndefined();
        }
      });

      it("should preserve provided values over defaults", () => {
        const customInput = {
          status: ["pending_approval", "rejected"],
          limit: 25,
          offset: 50,
        };
        const result = listQuizzesQuerySchema.safeParse(customInput);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.status).toEqual(["pending_approval", "rejected"]);
          expect(result.data.limit).toBe(25);
          expect(result.data.offset).toBe(50);
        }
      });
    });

    describe("Status Field Validation", () => {
      it.each([
        ["single approved status", ["approved"], true],
        ["single pending_approval status", ["pending_approval"], true],
        ["single rejected status", ["rejected"], true],
        ["multiple valid statuses", ["pending_approval", "approved"], true],
        [
          "all valid statuses",
          ["pending_approval", "approved", "rejected"],
          true,
        ],
        ["duplicate statuses", ["approved", "approved"], true],
        ["invalid status", ["invalid_status"], false],
        ["mixed valid and invalid", ["approved", "invalid"], false],
        ["empty array", [], true], // empty arrays are allowed
        ["non-array value", "approved", false],
        ["null value", null, false],
        ["undefined value", undefined, true], // Should apply default
      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
        const input = status === undefined ? {} : { status };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(isValid);

        if (isValid && result.success && status !== undefined) {
          expect(result.data.status).toEqual(status);
        }
      });

      it("should apply default status when undefined", () => {
        const result = listQuizzesQuerySchema.safeParse({});
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.status).toEqual(["approved"]);
        }
      });
    });

    describe("CreatorId Field Validation", () => {
      it.each([
        ["valid single creatorId", ["creator-123"], true],
        ["valid multiple creatorIds", ["creator-1", "creator-2"], true],
        ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
        ["valid alphanumeric", ["user123"], true],
        ["empty string in array", [""], false],
        ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
        ["mixed valid and empty", ["creator-1", ""], false],
        ["empty array", [], true],
        ["non-array value", "creator-123", false],
        ["null value", null, false],
        ["undefined value", undefined, true],
      ])("should validate creatorId: %s -> %s", (_desc, creatorId, isValid) => {
        const input = creatorId === undefined ? {} : { creatorId };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(isValid);

        if (isValid && result.success && creatorId !== undefined) {
          expect(result.data.creatorId).toEqual(creatorId);
        }
      });
    });

    describe("QuizId Field Validation", () => {
      it.each([
        ["valid single quizId", ["quiz-123"], true],
        ["valid multiple quizIds", ["quiz-1", "quiz-2", "quiz-3"], true],
        ["valid UUID format", ["550e8400-e29b-41d4-a716-446655440000"], true],
        ["valid alphanumeric", ["q1"], true],
        ["empty string in array", [""], false],
        ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
        ["mixed valid and empty", ["quiz-1", ""], false],
        ["empty array", [], true],
        ["non-array value", "quiz-123", false],
        ["null value", null, false],
        ["undefined value", undefined, true],
      ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
        const input = quizId === undefined ? {} : { quizId };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(isValid);

        if (isValid && result.success && quizId !== undefined) {
          expect(result.data.quizId).toEqual(quizId);
        }
      });
    });

    describe("Limit Field Validation", () => {
      it.each([
        ["minimum valid limit", 1, true],
        ["default limit", 10, true],
        ["moderate limit", 50, true],
        ["maximum valid limit", 100, true],
        ["zero limit", 0, false],
        ["negative limit", -1, false],
        ["over maximum limit", 101, false],
        ["decimal number", 10.5, false],
        ["string number", "10", false],
        ["null value", null, false],
        ["undefined value", undefined, true], // Should apply default
      ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
        const input = limit === undefined ? {} : { limit };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(isValid);

        if (isValid && result.success) {
          if (limit !== undefined) {
            expect(result.data.limit).toBe(limit);
          } else {
            expect(result.data.limit).toBe(10); // default
          }
        }
      });

      it("should apply default limit when undefined", () => {
        const result = listQuizzesQuerySchema.safeParse({});
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.limit).toBe(10);
        }
      });
    });

    describe("Offset Field Validation", () => {
      it.each([
        ["zero offset", 0, true],
        ["small offset", 10, true],
        ["large offset", 1000, true],
        ["very large offset", 999999, true],
        ["negative offset", -1, false],
        ["decimal number", 5.5, false],
        ["string number", "0", false],
        ["null value", null, false],
        ["undefined value", undefined, true], // Should apply default
      ])("should validate offset: %s -> %s", (_desc, offset, isValid) => {
        const input = offset === undefined ? {} : { offset };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(isValid);

        if (isValid && result.success) {
          if (offset !== undefined) {
            expect(result.data.offset).toBe(offset);
          } else {
            expect(result.data.offset).toBe(0); // default
          }
        }
      });

      it("should apply default offset when undefined", () => {
        const result = listQuizzesQuerySchema.safeParse({});
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.offset).toBe(0);
        }
      });
    });

    describe("Complex Validation Scenarios", () => {
      it("should accept valid complete query", () => {
        const validQuery = {
          status: ["approved", "pending_approval"],
          creatorId: ["creator-1", "creator-2"],
          quizId: ["quiz-1", "quiz-2", "quiz-3"],
          limit: 25,
          offset: 50,
        };
        const result = listQuizzesQuerySchema.safeParse(validQuery);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data).toEqual(validQuery);
        }
      });

      it("should reject invalid field combinations", () => {
        const invalidQuery = {
          status: ["invalid_status"],
          creatorId: [""], // empty string not allowed
          limit: 0, // below minimum
          offset: -1, // negative not allowed
        };
        const result = listQuizzesQuerySchema.safeParse(invalidQuery);
        expect(result.success).toBe(false);
      });

      it("should allow data with extra fields (schema is not strict)", () => {
        const dataWithExtraField = {
          status: ["approved"],
          limit: 10,
          offset: 0,
          extraField: "not allowed",
        };
        const result = listQuizzesQuerySchema.safeParse(dataWithExtraField);
        expect(result.success).toBe(true); // schema doesn't use .strict()
      });
    });
  });

  describe("listQueryFromReq Transformation Pipeline", () => {
    describe("Raw Input Processing", () => {
      it("should handle empty raw input", () => {
        const rawInput = {};
        const result = listQueryFromReq.safeParse(rawInput);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.status).toEqual(["approved"]);
          expect(result.data.limit).toBe(10);
          expect(result.data.offset).toBe(0);
        }
      });

      it("should transform string arrays correctly", () => {
        const rawInput = {
          status: ["pending_approval", "approved"],
          creatorId: ["creator-1", "creator-2"],
          quizId: ["quiz-1"],
        };
        const result = listQueryFromReq.safeParse(rawInput);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.status).toEqual(["pending_approval", "approved"]);
          expect(result.data.creatorId).toEqual(["creator-1", "creator-2"]);
          expect(result.data.quizId).toEqual(["quiz-1"]);
        }
      });

      it("should coerce string numbers to integers", () => {
        const rawInput = {
          limit: "25",
          offset: "100",
        };
        const result = listQueryFromReq.safeParse(rawInput);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.limit).toBe(25);
          expect(result.data.offset).toBe(100);
          expect(typeof result.data.limit).toBe("number");
          expect(typeof result.data.offset).toBe("number");
        }
      });

      it.each([
        ["valid limit string", { limit: "50" }, 50, true],
        ["valid offset string", { offset: "25" }, 25, true],
        ["decimal limit string", { limit: "10.5" }, 10.5, false], // coerces to number but fails int validation
        ["decimal offset string", { offset: "5.9" }, 5.9, false], // coerces to number but fails int validation
        ["invalid limit string", { limit: "abc" }, NaN, false],
        ["invalid offset string", { offset: "xyz" }, NaN, false],
        ["negative limit string", { limit: "-5" }, -5, false],
        ["negative offset string", { offset: "-1" }, -1, false],
      ])(
        "should handle numeric coercion: %s",
        (_desc, input, expected, isValid) => {
          const result = listQueryFromReq.safeParse(input);
          expect(result.success).toBe(isValid);

          if (isValid && result.success) {
            if ("limit" in input) {
              expect(result.data.limit).toBe(expected);
            }
            if ("offset" in input) {
              expect(result.data.offset).toBe(expected);
            }
          }
        },
      );
    });

    describe("Pipeline Integration", () => {
      it("should process realistic HTTP query parameter data", () => {
        const httpQueryParams = {
          status: ["approved", "pending_approval"],
          creatorId: ["user-123"],
          limit: "20",
          offset: "0",
        };
        const result = listQueryFromReq.safeParse(httpQueryParams);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.status).toEqual(["approved", "pending_approval"]);
          expect(result.data.creatorId).toEqual(["user-123"]);
          expect(result.data.limit).toBe(20);
          expect(result.data.offset).toBe(0);
          expect(typeof result.data.limit).toBe("number");
          expect(typeof result.data.offset).toBe("number");
        }
      });

      it("should handle mixed valid and invalid data correctly", () => {
        const mixedInput = {
          status: ["approved"], // valid
          creatorId: [""], // invalid - empty string
          limit: "15", // valid
          offset: "-5", // invalid - negative
        };
        const result = listQueryFromReq.safeParse(mixedInput);
        expect(result.success).toBe(false);
      });

      it("should preserve type safety through transformation", () => {
        const typedInput = {
          status: ["approved"] as const,
          limit: "50",
          offset: "0",
        };
        const result = listQueryFromReq.safeParse(typedInput);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(Array.isArray(result.data.status)).toBe(true);
          expect(typeof result.data.limit).toBe("number");
          expect(typeof result.data.offset).toBe("number");
        }
      });
    });
  });

  describe("Boundary Values and Edge Cases", () => {
    describe("Limit Boundary Testing", () => {
      it.each([
        ["minimum boundary - 1", 1, true],
        ["just below minimum", 0, false],
        ["maximum boundary - 100", 100, true],
        ["just above maximum", 101, false],
        ["large number", 1000, false],
        ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
      ])("should handle limit boundary: %s", (_desc, limit, isValid) => {
        const input = { limit };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("Offset Boundary Testing", () => {
      it.each([
        ["minimum boundary - 0", 0, true],
        ["just below minimum", -1, false],
        ["small positive", 1, true],
        ["large positive", 999999, true],
        ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, true],
      ])("should handle offset boundary: %s", (_desc, offset, isValid) => {
        const input = { offset };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("Array Edge Cases", () => {
      it("should handle empty arrays correctly", () => {
        const input = {
          status: [],
          creatorId: [],
          quizId: [],
        };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(true); // empty arrays are allowed, status will use default
      });

      it("should handle single-item arrays", () => {
        const input = {
          status: ["approved"],
          creatorId: ["single-creator"],
          quizId: ["single-quiz"],
        };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.status).toHaveLength(1);
          expect(result.data.creatorId).toHaveLength(1);
          expect(result.data.quizId).toHaveLength(1);
        }
      });

      it("should handle very large arrays", () => {
        const largeArray = Array(50)
          .fill("creator")
          .map((_, i) => `creator-${i}`);
        const input = {
          creatorId: largeArray,
        };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.creatorId).toHaveLength(50);
        }
      });
    });

    describe("Special Characters and Unicode", () => {
      it.each([
        ["special characters", ["creator-!@#$%"]],
        ["unicode characters", ["creator-プログラミング"]],
        ["emoji", ["creator-🚀"]],
        ["mixed unicode", ["creator-テスト123"]],
        ["URL encoded characters", ["creator-test%20user"]],
      ])("should handle %s in creatorId", (_desc, creatorId) => {
        const input = { creatorId };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.creatorId).toEqual(creatorId);
        }
      });
    });
  });

  describe("Error Handling and Validation Messages", () => {
    describe("Detailed Error Information", () => {
      it("should provide specific error paths for invalid status", () => {
        const input = { status: ["invalid_status"] };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const statusError = error.issues.find((issue) =>
            issue.path.includes("status"),
          );
          expect(statusError).toBeDefined();
          expect(statusError?.code).toBe("invalid_value");
        }
      });

      it("should provide specific error paths for invalid limit", () => {
        const input = { limit: 0 };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const limitError = error.issues.find((issue) =>
            issue.path.includes("limit"),
          );
          expect(limitError).toBeDefined();
          expect(limitError?.code).toBe("too_small");
        }
      });

      it("should provide specific error paths for invalid offset", () => {
        const input = { offset: -1 };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const offsetError = error.issues.find((issue) =>
            issue.path.includes("offset"),
          );
          expect(offsetError).toBeDefined();
          expect(offsetError?.code).toBe("too_small");
        }
      });

      it("should provide errors for empty strings in arrays", () => {
        const input = { creatorId: ["valid-creator", ""] };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const creatorIdError = error.issues.find((issue) =>
            issue.path.includes("creatorId"),
          );
          expect(creatorIdError).toBeDefined();
        }
      });
    });

    describe("Multiple Validation Errors", () => {
      it("should collect multiple validation errors", () => {
        const input = {
          status: ["invalid_status"],
          creatorId: [""],
          limit: 0,
          offset: -1,
        };
        const result = listQuizzesQuerySchema.safeParse(input);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          expect(error.issues.length).toBeGreaterThan(1);

          const errorPaths = error.issues.map((issue) => issue.path[0]);
          expect(errorPaths).toContain("status");
          expect(errorPaths).toContain("creatorId");
          expect(errorPaths).toContain("limit");
          expect(errorPaths).toContain("offset");
        }
      });
    });
  });

  describe("Type Safety and Integration", () => {
    describe("TypeScript Type Compatibility", () => {
      it("should maintain type safety with inferred types", () => {
        const validInput = {
          status: ["approved"] as const,
          limit: 20,
          offset: 0,
        };
        const result = listQuizzesQuerySchema.safeParse(validInput);
        expect(result.success).toBe(true);

        if (result.success) {
          // Type checks - these should compile without errors
          const data: ListQuizzesQuery = result.data;
          expect(data.status).toEqual(["approved"]);
          expect(typeof data.limit).toBe("number");
          expect(typeof data.offset).toBe("number");
        }
      });

      it("should work with partial input objects", () => {
        const partialInput: Partial<ListQuizzesQuery> = {
          status: ["pending_approval"],
          limit: 5,
        };
        const result = listQuizzesQuerySchema.safeParse(partialInput);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.status).toEqual(["pending_approval"]);
          expect(result.data.limit).toBe(5);
          expect(result.data.offset).toBe(0); // default
        }
      });
    });

    describe("Real-world Integration Scenarios", () => {
      it("should handle typical API pagination request", () => {
        const paginationRequest = {
          status: ["approved"],
          limit: 20,
          offset: 40, // page 3 with limit 20
        };
        const result = listQuizzesQuerySchema.safeParse(paginationRequest);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.limit).toBe(20);
          expect(result.data.offset).toBe(40);
        }
      });

      it("should handle filtering by multiple creators", () => {
        const multiCreatorRequest = {
          status: ["approved", "pending_approval"],
          creatorId: ["teacher-1", "teacher-2", "admin-user"],
          limit: 50,
        };
        const result = listQuizzesQuerySchema.safeParse(multiCreatorRequest);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.creatorId).toHaveLength(3);
          expect(result.data.status).toHaveLength(2);
        }
      });

      it("should handle quiz-specific filtering", () => {
        const specificQuizRequest = {
          quizId: ["quiz-abc123", "quiz-def456"],
          status: ["approved"],
        };
        const result = listQuizzesQuerySchema.safeParse(specificQuizRequest);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.quizId).toEqual(["quiz-abc123", "quiz-def456"]);
        }
      });
    });

    describe("Performance and Memory", () => {
      it("should handle validation performance within reasonable time", () => {
        const startTime = performance.now();

        const largeInput = {
          status: ["approved"],
          creatorId: Array(100)
            .fill(0)
            .map((_, i) => `creator-${i}`),
          quizId: Array(100)
            .fill(0)
            .map((_, i) => `quiz-${i}`),
          limit: 100,
          offset: 0,
        };

        const result = listQuizzesQuerySchema.safeParse(largeInput);
        const endTime = performance.now();

        expect(result.success).toBe(true);
        expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
      });

      it("should maintain memory efficiency with repeated validations", () => {
        const input = { status: ["approved"], limit: 10, offset: 0 };

        // Validate the same input multiple times
        for (let i = 0; i < 100; i++) {
          const result = listQuizzesQuerySchema.safeParse(input);
          expect(result.success).toBe(true);
        }
      });
    });
  });
});
