# Mutant d3cd1b09 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 516
**Stable ID**: d3cd1b09
**Location**: L346:28–L350:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #516
@@ -342,13 +342,9 @@
         expect(result.success).toBe(false);
       });
 
       it("should preserve type safety through transformation", () => {
-        const typedInput = {
-          status: ["approved"] as const,
-          limit: "50",
-          offset: "0",
-        };
+        const typedInput = {};
         const result = listQueryFromReq.safeParse(typedInput);
         expect(result.success).toBe(true);
 
         if (result.success) {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
