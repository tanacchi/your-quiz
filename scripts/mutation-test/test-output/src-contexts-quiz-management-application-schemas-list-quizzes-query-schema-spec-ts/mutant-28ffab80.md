# Mutant 28ffab80 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 530
**Stable ID**: 28ffab80
**Location**: L365:15–L372:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #530
@@ -361,16 +361,9 @@
   });
 
   describe("Boundary Values and Edge Cases", () => {
     describe("Limit Boundary Testing", () => {
-      it.each([
-        ["minimum boundary - 1", 1, true],
-        ["just below minimum", 0, false],
-        ["maximum boundary - 100", 100, true],
-        ["just above maximum", 101, false],
-        ["large number", 1000, false],
-        ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
-      ])("should handle limit boundary: %s", (_desc, limit, isValid) => {
+      it.each([])("should handle limit boundary: %s", (_desc, limit, isValid) => {
         const input = { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
