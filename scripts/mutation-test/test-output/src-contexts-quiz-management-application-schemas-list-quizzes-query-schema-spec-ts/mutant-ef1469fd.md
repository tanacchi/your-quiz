# Mutant ef1469fd Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 375
**Stable ID**: ef1469fd
**Location**: L219:22–L219:24

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #375
@@ -215,9 +215,9 @@
 
       it("should reject invalid field combinations", () => {
         const invalidQuery = {
           status: ["invalid_status"],
-          creatorId: "", // empty string not allowed
+          creatorId: "Stryker was here!", // empty string not allowed
           limit: 0, // below minimum
           offset: -1, // negative not allowed
         };
         const result = listQuizzesQuerySchema.safeParse(invalidQuery);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
