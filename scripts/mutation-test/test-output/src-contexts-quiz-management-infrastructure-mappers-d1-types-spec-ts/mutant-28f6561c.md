# Mutant 28f6561c Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7501
**Stable ID**: 28f6561c
**Location**: L99:39–L305:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7501
@@ -95,216 +95,10 @@
       expect(success).toBe(false);
     }
   };
 
-  describe("Schema Validation", () => {
-    describe("Answer Type Schema", () => {
-      test("should validate valid answer types", () => {
-        const validTypes = [
-          "boolean",
-          "free_text",
-          "single_choice",
-          "multiple_choice",
-        ];
+  describe("Schema Validation", () => {});
 
-        validTypes.forEach((type) => {
-          expectValidParse(zodAnswerTypeSchema, type);
-        });
-      });
-
-      test("should reject invalid answer types", () => {
-        const invalidTypes = ["invalid", "", null, undefined];
-
-        invalidTypes.forEach((type) => {
-          expectInvalidParse(zodAnswerTypeSchema, type);
-        });
-      });
-    });
-
-    describe("Quiz Status Schema", () => {
-      test("should validate valid quiz statuses", () => {
-        const validStatuses = ["pending_approval", "approved", "rejected"];
-
-        validStatuses.forEach((status) => {
-          expectValidParse(zodQuizStatusSchema, status);
-        });
-      });
-
-      test("should reject invalid quiz statuses", () => {
-        const invalidStatuses = ["invalid", "", null, undefined];
-
-        invalidStatuses.forEach((status) => {
-          expectInvalidParse(zodQuizStatusSchema, status);
-        });
-      });
-    });
-
-    describe("Matching Strategy Schema", () => {
-      test("should validate valid matching strategies", () => {
-        const validStrategies = ["exact", "partial", "regex"];
-
-        validStrategies.forEach((strategy) => {
-          expectValidParse(zodMatchingStrategySchema, strategy);
-        });
-      });
-
-      test("should reject invalid matching strategies", () => {
-        const invalidStrategies = ["invalid", "", null, undefined];
-
-        invalidStrategies.forEach((strategy) => {
-          expectInvalidParse(zodMatchingStrategySchema, strategy);
-        });
-      });
-    });
-
-    describe("Quiz Row Schema", () => {
-      test("should validate and transform valid quiz row", () => {
-        const validRow = createValidQuizRow();
-        expectValidParse(zodQuizRowSchema, validRow);
-      });
-
-      test("should handle numeric ID conversion", () => {
-        const baseRow = createValidQuizRow();
-        const rowWithNumericId = {
-          ...baseRow,
-          id: 123,
-        };
-        const parseResult = zodQuizRowSchema.safeParse(rowWithNumericId);
-
-        expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.id).toBe("123");
-        }
-      });
-
-      test("should handle optional fields correctly", () => {
-        const baseRow = createValidQuizRow();
-        const rowWithOptionals = {
-          ...baseRow,
-          explanation: "Test explanation",
-          approved_at: "2023-01-02T00:00:00Z",
-          boolean_value: true,
-          correct_answer: "test",
-          matching_strategy: "exact",
-          case_sensitive: false,
-          choices: '{"test": "value"}',
-          min_correct_answers: 2,
-        };
-
-        expectValidParse(zodQuizRowSchema, rowWithOptionals);
-      });
-
-      test("should handle null/undefined optional fields", () => {
-        const baseRow = createValidQuizRow();
-        const rowWithNulls = {
-          ...baseRow,
-          explanation: null,
-          approved_at: undefined,
-          boolean_value: null,
-        };
-
-        expectValidParse(zodQuizRowSchema, rowWithNulls);
-      });
-
-      test("should reject missing required fields", () => {
-        const requiredFields = [
-          "id",
-          "question",
-          "answer_type",
-          "solution_id",
-          "status",
-          "creator_id",
-          "created_at",
-        ];
-
-        requiredFields.forEach((field) => {
-          const baseRow = createValidQuizRow();
-          const invalidRow = { ...baseRow };
-          delete (invalidRow as Record<string, unknown>)[field];
-          expectInvalidParse(zodQuizRowSchema, invalidRow);
-        });
-      });
-    });
-
-    describe("Count Result Schema", () => {
-      test("should validate valid count result", () => {
-        expectValidParse(zodCountResultSchema, createValidCountResult());
-      });
-
-      test("should handle string number conversion", () => {
-        const stringTotal = { total: "42" };
-        const parseResult = zodCountResultSchema.safeParse(stringTotal);
-
-        expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.total).toBe(42);
-        }
-      });
-
-      test("should reject invalid count data", () => {
-        const invalidData = [{}, { total: null }, { total: "not-a-number" }];
-
-        invalidData.forEach((data) => {
-          expectInvalidParse(zodCountResultSchema, data);
-        });
-      });
-    });
-
-    describe("Basic Quiz Info Schema", () => {
-      test("should validate valid basic quiz info", () => {
-        expectValidParse(zodBasicQuizInfoSchema, createValidBasicQuizInfo());
-      });
-
-      test("should reject invalid basic quiz info", () => {
-        const requiredFields = ["id", "solution_id", "answer_type"];
-
-        requiredFields.forEach((field) => {
-          const baseInfo = createValidBasicQuizInfo();
-          const invalidInfo = { ...baseInfo };
-          delete (invalidInfo as Record<string, unknown>)[field];
-          expectInvalidParse(zodBasicQuizInfoSchema, invalidInfo);
-        });
-      });
-    });
-
-    describe("Parsed Choice Schema", () => {
-      test("should validate valid parsed choice", () => {
-        expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
-      });
-
-      test("should handle orderIndex conversion", () => {
-        const choiceWithStringIndex = {
-          ...createValidParsedChoice(),
-          orderIndex: "2",
-        };
-        const parseResult = zodParsedChoiceSchema.safeParse(
-          choiceWithStringIndex,
-        );
-
-        expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.orderIndex).toBe(2);
-        }
-      });
-
-      test("should reject invalid parsed choice", () => {
-        const requiredFields = [
-          "id",
-          "solutionId",
-          "text",
-          "orderIndex",
-          "isCorrect",
-        ];
-
-        requiredFields.forEach((field) => {
-          const invalidChoice = { ...createValidParsedChoice() };
-          delete (invalidChoice as Record<string, unknown>)[field];
-          expectInvalidParse(zodParsedChoiceSchema, invalidChoice);
-        });
-      });
-    });
-  });
-
   describe("Type Guards", () => {
     describe("isQuizRow", () => {
       test("should return true for valid quiz row", () => {
         expect(isQuizRow(createValidQuizRow())).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
