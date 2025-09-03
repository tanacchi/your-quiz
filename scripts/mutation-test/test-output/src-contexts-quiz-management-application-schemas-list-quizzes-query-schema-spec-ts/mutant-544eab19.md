# Mutant 544eab19 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 509
**Stable ID**: 544eab19
**Location**: L336:20–L336:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #509
@@ -332,9 +332,9 @@
       });
 
       it("should handle mixed valid and invalid data correctly", () => {
         const mixedInput = {
-          status: ["approved"], // valid
+          status: [""], // valid
           creatorId: "", // invalid - empty string
           limit: "15", // valid
           offset: "-5", // invalid - negative
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
