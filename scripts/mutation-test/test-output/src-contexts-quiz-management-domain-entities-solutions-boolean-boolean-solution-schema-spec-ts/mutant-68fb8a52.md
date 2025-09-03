# Mutant 68fb8a52 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: MethodExpression
**Original ID**: 6064
**Stable ID**: 68fb8a52
**Location**: L310:13–L312:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6064
@@ -306,11 +306,9 @@
         expect(result.success).toBe(false);
 
         if (!result.success) {
           const hasExpectedError = result.error.issues.some((issue) =>
-            expectedPath.every(
-              (pathPart, index) => issue.path[index] === pathPart,
-            ),
+            expectedPath.some((pathPart, index) => issue.path[index] === pathPart),
           );
           expect(hasExpectedError).toBe(true);
         }
       });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
