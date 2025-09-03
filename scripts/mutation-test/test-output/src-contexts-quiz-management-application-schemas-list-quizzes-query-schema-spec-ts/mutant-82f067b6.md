# Mutant 82f067b6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 508
**Stable ID**: 82f067b6
**Location**: L336:19–L336:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #508
@@ -332,9 +332,9 @@
       });
 
       it("should handle mixed valid and invalid data correctly", () => {
         const mixedInput = {
-          status: ["approved"], // valid
+          status: [], // valid
           creatorId: "", // invalid - empty string
           limit: "15", // valid
           offset: "-5", // invalid - negative
         };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
