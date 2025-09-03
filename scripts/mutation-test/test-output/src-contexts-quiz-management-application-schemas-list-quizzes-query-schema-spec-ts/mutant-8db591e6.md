# Mutant 8db591e6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 294
**Stable ID**: 8db591e6
**Location**: L154:10–L154:53

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #294
@@ -150,9 +150,9 @@
           }
         }
       });
 
-      it("should apply default limit when undefined", () => {
+      it("", () => {
         const result = listQuizzesQuerySchema.safeParse({});
         expect(result.success).toBe(true);
 
         if (result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
