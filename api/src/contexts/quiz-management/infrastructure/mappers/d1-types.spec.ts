import { Result } from "neverthrow";
import { describe, expect, test } from "vitest";
import {
  type CountResult,
  getCountValue,
  isBasicQuizInfo,
  isCountResult,
  isParsedChoice,
  isParsedChoiceArray,
  isQuizRow,
  isValidAnswerType,
  isValidMatchingStrategy,
  isValidQuizStatus,
  toBasicQuizInfo,
  toQuizRow,
  zodAnswerTypeSchema,
  zodBasicQuizInfoSchema,
  zodCountResultSchema,
  zodMatchingStrategySchema,
  zodParsedChoiceSchema,
  zodQuizRowSchema,
  zodQuizStatusSchema,
} from "./d1-types";

describe("D1 Types with Zod", () => {
  /**
   * 有効なクイズ行データを生成するヘルパー関数
   */
  const createValidQuizRow = () =>
    ({
      id: "1",
      question: "Test question",
      answer_type: "boolean",
      solution_id: "sol-1",
      status: "approved",
      creator_id: "user-1",
      created_at: "2023-01-01T00:00:00Z",
    }) as const;

  /**
   * 有効なカウント結果を生成するヘルパー関数
   */
  const createValidCountResult = () => ({ total: 42 }) as const;

  /**
   * 有効な基本クイズ情報を生成するヘルパー関数
   */
  const createValidBasicQuizInfo = () =>
    ({
      id: "1",
      solution_id: "sol-1",
      answer_type: "boolean",
    }) as const;

  /**
   * 有効な選択肢データを生成するヘルパー関数
   */
  const createValidParsedChoice = () =>
    ({
      id: "choice-1",
      solutionId: "sol-1",
      text: "Choice text",
      orderIndex: 0,
      isCorrect: true,
    }) as const;

  /**
   * Zodスキーマの安全なパース結果をテストするヘルパー関数
   */
  const expectValidParse = <T>(
    schema: { safeParse: (data: unknown) => { success: boolean; data?: T } },
    data: unknown,
  ) => {
    const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
    expect(parseResult.isOk()).toBe(true);

    if (parseResult.isOk()) {
      const { success } = parseResult.value;
      expect(success).toBe(true);
    }
  };

  /**
   * Zodスキーマの不正なパース結果をテストするヘルパー関数
   */
  const expectInvalidParse = (
    schema: { safeParse: (data: unknown) => { success: boolean } },
    data: unknown,
  ) => {
    const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
    expect(parseResult.isOk()).toBe(true);

    if (parseResult.isOk()) {
      const { success } = parseResult.value;
      expect(success).toBe(false);
    }
  };

  describe("Schema Validation", () => {
    describe("Answer Type Schema", () => {
      test("should validate valid answer types", () => {
        const validTypes = [
          "boolean",
          "free_text",
          "single_choice",
          "multiple_choice",
        ];

        validTypes.forEach((type) => {
          expectValidParse(zodAnswerTypeSchema, type);
        });
      });

      test("should reject invalid answer types", () => {
        const invalidTypes = ["invalid", "", null, undefined];

        invalidTypes.forEach((type) => {
          expectInvalidParse(zodAnswerTypeSchema, type);
        });
      });
    });

    describe("Quiz Status Schema", () => {
      test("should validate valid quiz statuses", () => {
        const validStatuses = ["pending_approval", "approved", "rejected"];

        validStatuses.forEach((status) => {
          expectValidParse(zodQuizStatusSchema, status);
        });
      });

      test("should reject invalid quiz statuses", () => {
        const invalidStatuses = ["invalid", "", null, undefined];

        invalidStatuses.forEach((status) => {
          expectInvalidParse(zodQuizStatusSchema, status);
        });
      });
    });

    describe("Matching Strategy Schema", () => {
      test("should validate valid matching strategies", () => {
        const validStrategies = ["exact", "partial", "regex"];

        validStrategies.forEach((strategy) => {
          expectValidParse(zodMatchingStrategySchema, strategy);
        });
      });

      test("should reject invalid matching strategies", () => {
        const invalidStrategies = ["invalid", "", null, undefined];

        invalidStrategies.forEach((strategy) => {
          expectInvalidParse(zodMatchingStrategySchema, strategy);
        });
      });
    });

    describe("Quiz Row Schema", () => {
      test("should validate and transform valid quiz row", () => {
        const validRow = createValidQuizRow();
        expectValidParse(zodQuizRowSchema, validRow);
      });

      test("should handle numeric ID conversion", () => {
        const baseRow = createValidQuizRow();
        const rowWithNumericId = {
          ...baseRow,
          id: 123,
        };
        const parseResult = zodQuizRowSchema.safeParse(rowWithNumericId);

        expect(parseResult.success).toBe(true);
        if (parseResult.success) {
          expect(parseResult.data.id).toBe("123");
        }
      });

      test("should handle optional fields correctly", () => {
        const baseRow = createValidQuizRow();
        const rowWithOptionals = {
          ...baseRow,
          explanation: "Test explanation",
          approved_at: "2023-01-02T00:00:00Z",
          boolean_value: true,
          correct_answer: "test",
          matching_strategy: "exact",
          case_sensitive: false,
          choices: '{"test": "value"}',
          min_correct_answers: 2,
        };

        expectValidParse(zodQuizRowSchema, rowWithOptionals);
      });

      test("should handle null/undefined optional fields", () => {
        const baseRow = createValidQuizRow();
        const rowWithNulls = {
          ...baseRow,
          explanation: null,
          approved_at: undefined,
          boolean_value: null,
        };

        expectValidParse(zodQuizRowSchema, rowWithNulls);
      });

      test("should reject missing required fields", () => {
        const requiredFields = [
          "id",
          "question",
          "answer_type",
          "solution_id",
          "status",
          "creator_id",
          "created_at",
        ];

        requiredFields.forEach((field) => {
          const baseRow = createValidQuizRow();
          const invalidRow = { ...baseRow };
          delete (invalidRow as Record<string, unknown>)[field];
          expectInvalidParse(zodQuizRowSchema, invalidRow);
        });
      });
    });

    describe("Count Result Schema", () => {
      test("should validate valid count result", () => {
        expectValidParse(zodCountResultSchema, createValidCountResult());
      });

      test("should handle string number conversion", () => {
        const stringTotal = { total: "42" };
        const parseResult = zodCountResultSchema.safeParse(stringTotal);

        expect(parseResult.success).toBe(true);
        if (parseResult.success) {
          expect(parseResult.data.total).toBe(42);
        }
      });

      test("should reject invalid count data", () => {
        const invalidData = [{}];

        invalidData.forEach((data) => {
          expectInvalidParse(zodCountResultSchema, data);
        });
      });
    });

    describe("Basic Quiz Info Schema", () => {
      test("should validate valid basic quiz info", () => {
        expectValidParse(zodBasicQuizInfoSchema, createValidBasicQuizInfo());
      });

      test("should reject invalid basic quiz info", () => {
        const requiredFields = ["id", "solution_id", "answer_type"];

        requiredFields.forEach((field) => {
          const baseInfo = createValidBasicQuizInfo();
          const invalidInfo = { ...baseInfo };
          delete (invalidInfo as Record<string, unknown>)[field];
          expectInvalidParse(zodBasicQuizInfoSchema, invalidInfo);
        });
      });
    });

    describe("Parsed Choice Schema", () => {
      test("should validate valid parsed choice", () => {
        expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
      });

      test("should handle orderIndex conversion", () => {
        const choiceWithStringIndex = {
          ...createValidParsedChoice(),
          orderIndex: "2",
        };
        const parseResult = zodParsedChoiceSchema.safeParse(
          choiceWithStringIndex,
        );

        expect(parseResult.success).toBe(true);
        if (parseResult.success) {
          expect(parseResult.data.orderIndex).toBe(2);
        }
      });

      test("should reject invalid parsed choice", () => {
        const requiredFields = [
          "id",
          "solutionId",
          "text",
          "orderIndex",
          "isCorrect",
        ];

        requiredFields.forEach((field) => {
          const invalidChoice = { ...createValidParsedChoice() };
          delete (invalidChoice as Record<string, unknown>)[field];
          expectInvalidParse(zodParsedChoiceSchema, invalidChoice);
        });
      });
    });
  });

  describe("Schema Structure Validation (ObjectLiteral Mutation Tests)", () => {
    describe("Quiz Row Schema Structure", () => {
      test("should require all essential fields", () => {
        const emptyObject = {};
        const parseResult = zodQuizRowSchema.safeParse(emptyObject);

        expect(parseResult.success).toBe(false);
        if (!parseResult.success) {
          expect(parseResult.error.issues.length).toBeGreaterThan(0);
          const missingFields = parseResult.error.issues.map(
            (issue) => issue.path[0],
          );
          expect(missingFields).toContain("id");
          expect(missingFields).toContain("question");
          expect(missingFields).toContain("answer_type");
        }
      });

      test("should validate field types strictly", () => {
        const invalidFieldTypes = {
          id: true, // boolean instead of string/number
          question: 123, // number instead of string
          answer_type: "invalid_type", // invalid enum value
          solution_id: null, // null instead of string/number
          status: [], // array instead of enum
          creator_id: {}, // object instead of string/number
          created_at: undefined, // undefined instead of string
        };

        const parseResult = zodQuizRowSchema.safeParse(invalidFieldTypes);
        expect(parseResult.success).toBe(false);
      });
    });

    describe("Count Result Schema Structure", () => {
      test("should require total field", () => {
        const emptyObject = {};
        const parseResult = zodCountResultSchema.safeParse(emptyObject);

        expect(parseResult.success).toBe(false);
        if (!parseResult.success) {
          expect(
            parseResult.error.issues.some((issue) => issue.path[0] === "total"),
          ).toBe(true);
        }
      });

      test("should accept various coercible values", () => {
        const coercibleTypes = [
          { total: true, expected: 1 },
          { total: false, expected: 0 },
          { total: null, expected: 0 },
          { total: "123", expected: 123 },
        ];

        coercibleTypes.forEach(({ total, expected }) => {
          const parseResult = zodCountResultSchema.safeParse({ total });
          expect(parseResult.success).toBe(true);
          if (parseResult.success) {
            expect(parseResult.data.total).toBe(expected);
          }
        });
      });

      test("should accept coercible arrays", () => {
        const coercibleArrays = [
          { total: [], expected: 0 },
          { total: [123], expected: 123 },
        ];

        coercibleArrays.forEach(({ total, expected }) => {
          const parseResult = zodCountResultSchema.safeParse({ total });
          expect(parseResult.success).toBe(true);
          if (parseResult.success) {
            expect(parseResult.data.total).toBe(expected);
          }
        });
      });

      test("should reject truly non-coercible values", () => {
        const invalidTotalTypes = [
          { total: {} },
          { total: Symbol("test") },
          { total: () => {} },
        ];

        invalidTotalTypes.forEach((data) => {
          const parseResult = zodCountResultSchema.safeParse(data);
          expect(parseResult.success).toBe(false);
        });
      });
    });

    describe("Basic Quiz Info Schema Structure", () => {
      test("should require all essential fields", () => {
        const emptyObject = {};
        const parseResult = zodBasicQuizInfoSchema.safeParse(emptyObject);

        expect(parseResult.success).toBe(false);
        if (!parseResult.success) {
          const missingFields = parseResult.error.issues.map(
            (issue) => issue.path[0],
          );
          expect(missingFields).toContain("id");
          expect(missingFields).toContain("solution_id");
          expect(missingFields).toContain("answer_type");
        }
      });
    });

    describe("Parsed Choice Schema Structure", () => {
      test("should require all essential fields", () => {
        const emptyObject = {};
        const parseResult = zodParsedChoiceSchema.safeParse(emptyObject);

        expect(parseResult.success).toBe(false);
        if (!parseResult.success) {
          const missingFields = parseResult.error.issues.map(
            (issue) => issue.path[0],
          );
          expect(missingFields).toContain("id");
          expect(missingFields).toContain("solutionId");
          expect(missingFields).toContain("text");
          expect(missingFields).toContain("orderIndex");
          expect(missingFields).toContain("isCorrect");
        }
      });

      test("should validate field types strictly", () => {
        const invalidFieldTypes = {
          id: 123, // number instead of string
          solutionId: [], // array instead of string
          text: {}, // object instead of string
          orderIndex: "not-a-number", // invalid string instead of number
          isCorrect: "true", // string instead of boolean
        };

        const parseResult = zodParsedChoiceSchema.safeParse(invalidFieldTypes);
        expect(parseResult.success).toBe(false);
      });
    });
  });

  describe("Type Guards", () => {
    describe("isQuizRow", () => {
      test("should return true for valid quiz row", () => {
        expect(isQuizRow(createValidQuizRow())).toBe(true);
      });

      test("should return false for invalid data", () => {
        const invalidInputs = [
          null,
          undefined,
          "string",
          123,
          {},
          { invalid: "data" },
        ];

        invalidInputs.forEach((input) => {
          expect(isQuizRow(input)).toBe(false);
        });
      });
    });

    describe("isCountResult", () => {
      test("should return true for valid count result", () => {
        expect(isCountResult(createValidCountResult())).toBe(true);
      });

      test("should return false for invalid data", () => {
        expect(isCountResult({ invalid: "data" })).toBe(false);
      });
    });

    describe("isBasicQuizInfo", () => {
      test("should return true for valid basic quiz info", () => {
        expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
      });

      test("should return false for invalid data", () => {
        expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
      });
    });

    describe("isParsedChoice", () => {
      test("should return true for valid parsed choice", () => {
        expect(isParsedChoice(createValidParsedChoice())).toBe(true);
      });

      test("should return false for invalid data", () => {
        expect(isParsedChoice({ invalid: "data" })).toBe(false);
      });
    });

    describe("isParsedChoiceArray", () => {
      test("should return true for valid array", () => {
        const validChoices = [
          createValidParsedChoice(),
          createValidParsedChoice(),
        ];
        expect(isParsedChoiceArray(validChoices)).toBe(true);
      });

      test("should return true for empty array", () => {
        expect(isParsedChoiceArray([])).toBe(true);
      });

      test("should return false for invalid array", () => {
        expect(isParsedChoiceArray([{ invalid: "data" }])).toBe(false);
        expect(isParsedChoiceArray("not-an-array")).toBe(false);
      });
    });

    describe("String Validation Guards", () => {
      test("should validate answer types", () => {
        expect(isValidAnswerType("boolean")).toBe(true);
        expect(isValidAnswerType("invalid")).toBe(false);
      });

      test("should validate quiz statuses", () => {
        expect(isValidQuizStatus("approved")).toBe(true);
        expect(isValidQuizStatus("invalid")).toBe(false);
      });

      test("should validate matching strategies", () => {
        expect(isValidMatchingStrategy("exact")).toBe(true);
        expect(isValidMatchingStrategy("invalid")).toBe(false);
      });
    });
  });

  describe("Conversion Functions", () => {
    describe("toQuizRow", () => {
      test("should convert valid input correctly", () => {
        const input = {
          id: 123,
          question: "Test question",
          answer_type: "boolean",
          solution_id: 456,
          status: "approved",
          creator_id: 789,
          created_at: "2023-01-01T00:00:00Z",
        };

        const conversionResult = Result.fromThrowable(() => toQuizRow(input))();
        expect(conversionResult.isOk()).toBe(true);

        if (conversionResult.isOk()) {
          const result = conversionResult.value;
          expect(result.id).toBe("123");
          expect(result.question).toBe("Test question");
          expect(result.answer_type).toBe("boolean");
        }
      });

      test("should handle optional fields", () => {
        const inputWithOptionals = {
          ...createValidQuizRow(),
          explanation: "Test explanation",
          boolean_value: 1,
          min_correct_answers: "2",
        };

        const conversionResult = Result.fromThrowable(() =>
          toQuizRow(inputWithOptionals as Record<string, unknown>),
        )();

        expect(conversionResult.isOk()).toBe(true);
      });

      test("should throw error for invalid input", () => {
        const conversionResult = Result.fromThrowable(() =>
          toQuizRow({ invalid: "data" }),
        )();

        expect(conversionResult.isErr()).toBe(true);
      });
    });

    describe("toBasicQuizInfo", () => {
      test("should convert valid input correctly", () => {
        const input = {
          id: 123,
          solution_id: 456,
          answer_type: "boolean",
        };

        const conversionResult = Result.fromThrowable(() =>
          toBasicQuizInfo(input),
        )();
        expect(conversionResult.isOk()).toBe(true);

        if (conversionResult.isOk()) {
          const result = conversionResult.value;
          expect(result.id).toBe("123");
          expect(result.solution_id).toBe("456");
          expect(result.answer_type).toBe("boolean");
        }
      });

      test("should throw error for invalid input", () => {
        const conversionResult = Result.fromThrowable(() =>
          toBasicQuizInfo({ invalid: "data" }),
        )();

        expect(conversionResult.isErr()).toBe(true);
      });
    });

    describe("getCountValue", () => {
      test("should return count value", () => {
        const input: CountResult = { total: 42 };
        expect(getCountValue(input)).toBe(42);
      });
    });
  });

  describe("Optional Field Conditional Logic (ConditionalExpression Mutation Tests)", () => {
    describe("toQuizRow transformation with null values", () => {
      test("should exclude null optional fields from result", () => {
        const inputWithNulls = {
          ...createValidQuizRow(),
          explanation: null,
          approved_at: null,
          boolean_value: null,
          correct_answer: null,
          matching_strategy: null,
          case_sensitive: null,
          choices: null,
          min_correct_answers: null,
        };

        const conversionResult = Result.fromThrowable(() =>
          toQuizRow(inputWithNulls as Record<string, unknown>),
        )();

        expect(conversionResult.isOk()).toBe(true);
        if (conversionResult.isOk()) {
          const result = conversionResult.value;
          // Required fields should exist
          expect(result.id).toBeDefined();
          expect(result.question).toBeDefined();
          // Null optional fields should not exist in result
          expect(result).not.toHaveProperty("explanation");
          expect(result).not.toHaveProperty("approved_at");
          expect(result).not.toHaveProperty("boolean_value");
          expect(result).not.toHaveProperty("correct_answer");
          expect(result).not.toHaveProperty("matching_strategy");
          expect(result).not.toHaveProperty("case_sensitive");
          expect(result).not.toHaveProperty("choices");
          expect(result).not.toHaveProperty("min_correct_answers");
        }
      });

      test("should include non-null optional fields in result", () => {
        const inputWithValues = {
          ...createValidQuizRow(),
          explanation: "Test explanation",
          approved_at: "2023-01-02T00:00:00Z",
          boolean_value: true,
          correct_answer: "test answer",
          matching_strategy: "exact",
          case_sensitive: true,
          choices: '{"test": "value"}',
          min_correct_answers: 2,
        };

        const conversionResult = Result.fromThrowable(() =>
          toQuizRow(inputWithValues as Record<string, unknown>),
        )();

        expect(conversionResult.isOk()).toBe(true);
        if (conversionResult.isOk()) {
          const result = conversionResult.value;
          // All fields should exist in result
          expect(result.explanation).toBe("Test explanation");
          expect(result.approved_at).toBe("2023-01-02T00:00:00Z");
          expect(result.boolean_value).toBe(true);
          expect(result.correct_answer).toBe("test answer");
          expect(result.matching_strategy).toBe("exact");
          expect(result.case_sensitive).toBe(true);
          expect(result.choices).toBe('{"test": "value"}');
          expect(result.min_correct_answers).toBe(2);
        }
      });

      test("should handle undefined optional fields correctly", () => {
        const inputWithUndefined = {
          ...createValidQuizRow(),
          explanation: undefined,
          approved_at: undefined,
          boolean_value: undefined,
        };

        const conversionResult = Result.fromThrowable(() =>
          toQuizRow(inputWithUndefined as Record<string, unknown>),
        )();

        expect(conversionResult.isOk()).toBe(true);
        if (conversionResult.isOk()) {
          const result = conversionResult.value;
          expect(result).not.toHaveProperty("explanation");
          expect(result).not.toHaveProperty("approved_at");
          expect(result).not.toHaveProperty("boolean_value");
        }
      });
    });

    describe("Quiz Row Schema conditional field validation", () => {
      test("should validate each optional field condition separately", () => {
        const testCases = [
          { field: "explanation", validValue: "test", nullValue: null },
          {
            field: "approved_at",
            validValue: "2023-01-01T00:00:00Z",
            nullValue: null,
          },
          { field: "boolean_value", validValue: true, nullValue: null },
          { field: "correct_answer", validValue: "answer", nullValue: null },
          { field: "matching_strategy", validValue: "exact", nullValue: null },
          { field: "case_sensitive", validValue: false, nullValue: null },
          { field: "choices", validValue: "[]", nullValue: null },
          { field: "min_correct_answers", validValue: 1, nullValue: null },
        ];

        testCases.forEach(({ field, validValue, nullValue }) => {
          const baseRow = createValidQuizRow();

          // Test with valid value - should include field
          const rowWithValue = { ...baseRow, [field]: validValue };
          const validResult = zodQuizRowSchema.safeParse(rowWithValue);
          expect(validResult.success).toBe(true);
          if (validResult.success) {
            expect(validResult.data).toHaveProperty(field);
          }

          // Test with null value - should exclude field
          const rowWithNull = { ...baseRow, [field]: nullValue };
          const nullResult = zodQuizRowSchema.safeParse(rowWithNull);
          expect(nullResult.success).toBe(true);
          if (nullResult.success) {
            expect(nullResult.data).not.toHaveProperty(field);
          }
        });
      });
    });
  });

  describe("Performance and Edge Cases", () => {
    test("should validate large dataset efficiently", () => {
      const startTime = performance.now();
      const largeDataset = Array.from(
        { length: 1000 },
        (_, i) =>
          ({
            id: String(i),
            question: `Question ${i}`,
            answer_type: "boolean",
            solution_id: `sol-${i}`,
            status: "approved",
            creator_id: `user-${i}`,
            created_at: "2023-01-01T00:00:00Z",
          }) satisfies unknown,
      );

      largeDataset.forEach((item) => {
        expect(isQuizRow(item)).toBe(true);
      });

      const endTime = performance.now();
      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(200); // Should complete within 200ms (increased for added tests)
    });

    test("should handle edge cases gracefully", () => {
      const edgeCases = [{}, null, undefined, "", 123, []];

      edgeCases.forEach((input) => {
        expect(isQuizRow(input)).toBe(false);
        expect(isCountResult(input)).toBe(false);
        expect(isBasicQuizInfo(input)).toBe(false);
        expect(isParsedChoice(input)).toBe(false);
      });
    });

    test("should handle malformed input gracefully", () => {
      const malformedInputs = [
        { id: Symbol("test") }, // Symbol type
        { question: new Date() }, // Date object
        { answer_type: /regex/ }, // RegExp object
        { status: () => {} }, // Function
      ];

      malformedInputs.forEach((input) => {
        expect(isQuizRow(input)).toBe(false);
        expect(isCountResult(input)).toBe(false);
        expect(isBasicQuizInfo(input)).toBe(false);
        expect(isParsedChoice(input)).toBe(false);
      });
    });
  });

  describe("Error Message Validation (StringLiteral Mutation Tests)", () => {
    describe("Schema error messages", () => {
      test("should provide specific error message for invalid number string in count result", () => {
        const invalidCountData = { total: "not-a-number" };
        const parseResult = zodCountResultSchema.safeParse(invalidCountData);

        expect(parseResult.success).toBe(false);
        if (!parseResult.success) {
          const errorMessage = parseResult.error.message;
          expect(errorMessage).toContain(
            "Invalid input: expected number, received NaN",
          );
        }
      });

      test("should provide specific error message for invalid number string in parsed choice", () => {
        const invalidChoiceData = {
          ...createValidParsedChoice(),
          orderIndex: "invalid-number",
        };
        const parseResult = zodParsedChoiceSchema.safeParse(invalidChoiceData);

        expect(parseResult.success).toBe(false);
        if (!parseResult.success) {
          const errorMessage = parseResult.error.message;
          expect(errorMessage).toContain(
            "Invalid input: expected number, received NaN",
          );
        }
      });

      test("should provide specific error message for invalid number string in quiz row min_correct_answers", () => {
        const invalidRowData = {
          ...createValidQuizRow(),
          min_correct_answers: "not-a-number",
        };
        const parseResult = zodQuizRowSchema.safeParse(invalidRowData);

        expect(parseResult.success).toBe(false);
        if (!parseResult.success) {
          const errorMessage = parseResult.error.message;
          expect(errorMessage).toContain(
            "Invalid input: expected number, received NaN",
          );
        }
      });
    });

    describe("Conversion function error messages", () => {
      test("should provide descriptive error for toQuizRow with invalid data", () => {
        const invalidData = { invalid: "data" };

        expect(() => toQuizRow(invalidData)).toThrow(/Invalid QuizRow data/);
      });

      test("should provide descriptive error for toBasicQuizInfo with invalid data", () => {
        const invalidData = { invalid: "data" };

        expect(() => toBasicQuizInfo(invalidData)).toThrow(
          /Invalid BasicQuizInfo data/,
        );
      });
    });
  });

  describe("Edge Cases and Boundary Values", () => {
    describe("String to number conversion edge cases", () => {
      test("should handle edge case number strings correctly", () => {
        const edgeCases = [
          { total: "0" },
          { total: "-1" },
          { total: "999999" },
          { total: "0.5" },
        ];

        edgeCases.forEach((data) => {
          const parseResult = zodCountResultSchema.safeParse(data);
          expect(parseResult.success).toBe(true);
          if (parseResult.success) {
            expect(typeof parseResult.data.total).toBe("number");
          }
        });
      });

      test("should reject invalid number strings", () => {
        const invalidCases = [
          { total: "not-a-number" },
          { total: "abc" },
          { total: "1.2.3" },
          { total: "1e2e3" },
        ];

        invalidCases.forEach((data) => {
          const parseResult = zodCountResultSchema.safeParse(data);
          expect(parseResult.success).toBe(false);
        });
      });
    });

    describe("Boolean conversion edge cases", () => {
      test("should convert number to boolean correctly", () => {
        const testCases = [
          {
            input: { ...createValidQuizRow(), boolean_value: 0 },
            field: "boolean_value",
            expected: false,
          },
          {
            input: { ...createValidQuizRow(), boolean_value: 1 },
            field: "boolean_value",
            expected: true,
          },
          {
            input: { ...createValidQuizRow(), boolean_value: -1 },
            field: "boolean_value",
            expected: true,
          },
          {
            input: { ...createValidQuizRow(), case_sensitive: 0 },
            field: "case_sensitive",
            expected: false,
          },
          {
            input: { ...createValidQuizRow(), case_sensitive: 1 },
            field: "case_sensitive",
            expected: true,
          },
        ];

        testCases.forEach(({ input, field, expected }) => {
          const parseResult = zodQuizRowSchema.safeParse(input);
          expect(parseResult.success).toBe(true);
          if (parseResult.success) {
            if (field === "boolean_value") {
              expect(parseResult.data.boolean_value).toBe(expected);
            } else if (field === "case_sensitive") {
              expect(parseResult.data.case_sensitive).toBe(expected);
            }
          }
        });
      });
    });
  });
});
