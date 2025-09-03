# Mutant 526fa3e8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 381
**Stable ID**: 526fa3e8
**Location**: L229:19–L229:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #381
@@ -225,9 +225,9 @@
       });
 
       it("should allow data with extra fields (schema is not strict)", () => {
         const dataWithExtraField = {
-          status: ["approved"],
+          status: [],
           limit: 10,
           offset: 0,
           extraField: "not allowed",
         };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
