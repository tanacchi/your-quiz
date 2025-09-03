# Mutant 2c69cd50 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 518
**Stable ID**: 2c69cd50
**Location**: L349:19–L349:22

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #518
@@ -345,9 +345,9 @@
       it("should preserve type safety through transformation", () => {
         const typedInput = {
           status: ["approved"] as const,
           limit: "50",
-          offset: "0",
+          offset: "",
         };
         const result = listQueryFromReq.safeParse(typedInput);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
