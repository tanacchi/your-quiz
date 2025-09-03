# Mutant bd54ac4f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 608
**Stable ID**: bd54ac4f
**Location**: L436:15–L442:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #608
@@ -432,15 +432,9 @@
       });
     });
 
     describe("Special Characters and Unicode", () => {
-      it.each([
-        ["special characters", "creator-!@#$%"],
-        ["unicode characters", "creator-プログラミング"],
-        ["emoji", "creator-🚀"],
-        ["mixed unicode", "creator-テスト123"],
-        ["URL encoded characters", "creator-test%20user"],
-      ])("should handle %s in creatorId", (_desc, creatorId) => {
+      it.each([])("should handle %s in creatorId", (_desc, creatorId) => {
         const input = { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
