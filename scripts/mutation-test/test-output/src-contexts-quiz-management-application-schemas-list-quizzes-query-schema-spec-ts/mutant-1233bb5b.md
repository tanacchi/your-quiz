# Mutant 1233bb5b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 422
**Stable ID**: 1233bb5b
**Location**: L278:13–L278:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #422
@@ -274,9 +274,9 @@
         };
         const result = listQueryFromReq.safeParse(rawInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data.limit).toBe(25);
           expect(result.data.offset).toBe(100);
           expect(typeof result.data.limit).toBe("number");
           expect(typeof result.data.offset).toBe("number");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
