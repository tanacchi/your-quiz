# Mutant 3532b7a4 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 674
**Stable ID**: 3532b7a4
**Location**: L501:10–L501:51

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #674
@@ -497,9 +497,9 @@
           expect(offsetError?.code).toBe("too_small");
         }
       });
 
-      it("should provide errors for empty strings", () => {
+      it("", () => {
         const input = { creatorId: "" };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
