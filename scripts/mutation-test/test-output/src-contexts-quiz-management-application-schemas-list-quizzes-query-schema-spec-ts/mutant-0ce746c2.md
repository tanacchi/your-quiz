# Mutant 0ce746c2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 514
**Stable ID**: 0ce746c2
**Location**: L345:10–L345:62

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #514
@@ -341,9 +341,9 @@
         const result = listQueryFromReq.safeParse(mixedInput);
         expect(result.success).toBe(false);
       });
 
-      it("should preserve type safety through transformation", () => {
+      it("", () => {
         const typedInput = {
           status: ["approved"] as const,
           limit: "50",
           offset: "0",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
