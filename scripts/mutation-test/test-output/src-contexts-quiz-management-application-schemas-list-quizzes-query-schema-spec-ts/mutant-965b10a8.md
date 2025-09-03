# Mutant 965b10a8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 521
**Stable ID**: 965b10a8
**Location**: L354:13–L354:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #521
@@ -350,9 +350,9 @@
         };
         const result = listQueryFromReq.safeParse(typedInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(Array.isArray(result.data.status)).toBe(true);
           expect(typeof result.data.limit).toBe("number");
           expect(typeof result.data.offset).toBe("number");
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
