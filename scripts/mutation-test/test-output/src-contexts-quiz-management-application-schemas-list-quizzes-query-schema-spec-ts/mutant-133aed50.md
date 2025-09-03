# Mutant 133aed50 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 288
**Stable ID**: 133aed50
**Location**: L145:40–L151:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #288
@@ -141,15 +141,9 @@
         const input = limit === undefined ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
-          if (limit !== undefined) {
-            expect(result.data.limit).toBe(limit);
-          } else {
-            expect(result.data.limit).toBe(10); // default
-          }
-        }
+        if (isValid && result.success) {}
       });
 
       it("should apply default limit when undefined", () => {
         const result = listQuizzesQuerySchema.safeParse({});
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
