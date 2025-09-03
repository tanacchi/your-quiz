# Mutant 616e85a6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 512
**Stable ID**: 616e85a6
**Location**: L339:19–L339:23

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #512
@@ -335,9 +335,9 @@
         const mixedInput = {
           status: ["approved"], // valid
           creatorId: "", // invalid - empty string
           limit: "15", // valid
-          offset: "-5", // invalid - negative
+          offset: "", // invalid - negative
         };
         const result = listQueryFromReq.safeParse(mixedInput);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
