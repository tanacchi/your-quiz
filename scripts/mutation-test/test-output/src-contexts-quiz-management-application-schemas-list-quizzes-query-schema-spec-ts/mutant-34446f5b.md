# Mutant 34446f5b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 510
**Stable ID**: 34446f5b
**Location**: L337:22–L337:24

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #510
@@ -333,9 +333,9 @@
 
       it("should handle mixed valid and invalid data correctly", () => {
         const mixedInput = {
           status: ["approved"], // valid
-          creatorId: "", // invalid - empty string
+          creatorId: "Stryker was here!", // invalid - empty string
           limit: "15", // valid
           offset: "-5", // invalid - negative
         };
         const result = listQueryFromReq.safeParse(mixedInput);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
