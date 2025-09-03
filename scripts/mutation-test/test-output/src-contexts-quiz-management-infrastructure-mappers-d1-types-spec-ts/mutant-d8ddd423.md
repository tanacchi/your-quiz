# Mutant d8ddd423 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7722
**Stable ID**: d8ddd423
**Location**: L396:42–L480:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7722
@@ -392,94 +392,10 @@
       });
     });
   });
 
-  describe("Conversion Functions", () => {
-    describe("toQuizRow", () => {
-      test("should convert valid input correctly", () => {
-        const input = {
-          id: 123,
-          question: "Test question",
-          answer_type: "boolean",
-          solution_id: 456,
-          status: "approved",
-          creator_id: 789,
-          created_at: "2023-01-01T00:00:00Z",
-        };
+  describe("Conversion Functions", () => {});
 
-        const conversionResult = Result.fromThrowable(() => toQuizRow(input))();
-        expect(conversionResult.isOk()).toBe(true);
-
-        if (conversionResult.isOk()) {
-          const result = conversionResult.value;
-          expect(result.id).toBe("123");
-          expect(result.question).toBe("Test question");
-          expect(result.answer_type).toBe("boolean");
-        }
-      });
-
-      test("should handle optional fields", () => {
-        const inputWithOptionals = {
-          ...createValidQuizRow(),
-          explanation: "Test explanation",
-          boolean_value: 1,
-          min_correct_answers: "2",
-        };
-
-        const conversionResult = Result.fromThrowable(() =>
-          toQuizRow(inputWithOptionals as Record<string, unknown>),
-        )();
-
-        expect(conversionResult.isOk()).toBe(true);
-      });
-
-      test("should throw error for invalid input", () => {
-        const conversionResult = Result.fromThrowable(() =>
-          toQuizRow({ invalid: "data" }),
-        )();
-
-        expect(conversionResult.isErr()).toBe(true);
-      });
-    });
-
-    describe("toBasicQuizInfo", () => {
-      test("should convert valid input correctly", () => {
-        const input = {
-          id: 123,
-          solution_id: 456,
-          answer_type: "boolean",
-        };
-
-        const conversionResult = Result.fromThrowable(() =>
-          toBasicQuizInfo(input),
-        )();
-        expect(conversionResult.isOk()).toBe(true);
-
-        if (conversionResult.isOk()) {
-          const result = conversionResult.value;
-          expect(result.id).toBe("123");
-          expect(result.solution_id).toBe("456");
-          expect(result.answer_type).toBe("boolean");
-        }
-      });
-
-      test("should throw error for invalid input", () => {
-        const conversionResult = Result.fromThrowable(() =>
-          toBasicQuizInfo({ invalid: "data" }),
-        )();
-
-        expect(conversionResult.isErr()).toBe(true);
-      });
-    });
-
-    describe("getCountValue", () => {
-      test("should return count value", () => {
-        const input: CountResult = { total: 42 };
-        expect(getCountValue(input)).toBe(42);
-      });
-    });
-  });
-
   describe("Performance and Edge Cases", () => {
     test("should validate large dataset efficiently", () => {
       const startTime = performance.now();
       const largeDataset = Array.from(
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
