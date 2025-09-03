# Mutant a7b5eda9 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 511
**Stable ID**: a7b5eda9
**Location**: L338:18–L338:22

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #511
@@ -334,9 +334,9 @@
       it("should handle mixed valid and invalid data correctly", () => {
         const mixedInput = {
           status: ["approved"], // valid
           creatorId: "", // invalid - empty string
-          limit: "15", // valid
+          limit: "", // valid
           offset: "-5", // invalid - negative
         };
         const result = listQueryFromReq.safeParse(mixedInput);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
