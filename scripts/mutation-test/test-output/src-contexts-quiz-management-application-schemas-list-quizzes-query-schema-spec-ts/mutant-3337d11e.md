# Mutant 3337d11e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 574
**Stable ID**: 3337d11e
**Location**: L393:14–L393:32

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #574
@@ -389,9 +389,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Array Edge Cases", () => {
+    describe("", () => {
       it("should handle empty arrays correctly", () => {
         const input = {
           status: [],
           quizId: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
