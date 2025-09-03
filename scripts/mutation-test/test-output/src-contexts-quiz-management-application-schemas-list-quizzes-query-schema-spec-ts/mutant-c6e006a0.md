# Mutant c6e006a0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 649
**Stable ID**: c6e006a0
**Location**: L471:10–L471:65

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #649
@@ -467,9 +467,9 @@
           expect(statusError?.code).toBe("invalid_value");
         }
       });
 
-      it("should provide specific error paths for invalid limit", () => {
+      it("", () => {
         const input = { limit: 0 };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
