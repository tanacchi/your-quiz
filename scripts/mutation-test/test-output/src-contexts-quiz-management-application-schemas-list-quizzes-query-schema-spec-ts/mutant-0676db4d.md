# Mutant 0676db4d Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 394
**Stable ID**: 0676db4d
**Location**: L247:29–L251:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #394
@@ -243,13 +243,9 @@
         const rawInput = {};
         const result = listQueryFromReq.safeParse(rawInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.status).toEqual(["approved"]);
-          expect(result.data.limit).toBe(10);
-          expect(result.data.offset).toBe(0);
-        }
+        if (result.success) {}
       });
 
       it("should transform string arrays correctly", () => {
         const rawInput = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
