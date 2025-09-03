# Mutant 3713ede8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7726
**Stable ID**: 3713ede8
**Location**: L398:58–L418:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7726
@@ -394,30 +394,10 @@
   });
 
   describe("Conversion Functions", () => {
     describe("toQuizRow", () => {
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
+      test("should convert valid input correctly", () => {});
 
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
       test("should handle optional fields", () => {
         const inputWithOptionals = {
           ...createValidQuizRow(),
           explanation: "Test explanation",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
