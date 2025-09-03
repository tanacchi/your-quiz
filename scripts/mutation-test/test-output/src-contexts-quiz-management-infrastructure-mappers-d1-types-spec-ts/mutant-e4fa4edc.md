# Mutant e4fa4edc Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7561
**Stable ID**: e4fa4edc
**Location**: L179:61–L194:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7561
@@ -175,25 +175,10 @@
           expect(parseResult.data.id).toBe("123");
         }
       });
 
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
+      test("should handle optional fields correctly", () => {});
 
-        expectValidParse(zodQuizRowSchema, rowWithOptionals);
-      });
-
       test("should handle null/undefined optional fields", () => {
         const baseRow = createValidQuizRow();
         const rowWithNulls = {
           ...baseRow,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
