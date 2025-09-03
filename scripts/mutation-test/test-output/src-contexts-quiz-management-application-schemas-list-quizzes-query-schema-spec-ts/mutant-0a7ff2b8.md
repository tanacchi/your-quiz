# Mutant 0a7ff2b8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 378
**Stable ID**: 0a7ff2b8
**Location**: L227:10–L227:70

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #378
@@ -223,9 +223,9 @@
         const result = listQuizzesQuerySchema.safeParse(invalidQuery);
         expect(result.success).toBe(false);
       });
 
-      it("should allow data with extra fields (schema is not strict)", () => {
+      it("", () => {
         const dataWithExtraField = {
           status: ["approved"],
           limit: 10,
           offset: 0,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
