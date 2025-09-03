# Mutant ff97d81d Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6066
**Stable ID**: ff97d81d
**Location**: L311:36–L311:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6066
@@ -307,9 +307,9 @@
 
         if (!result.success) {
           const hasExpectedError = result.error.issues.some((issue) =>
             expectedPath.every(
-              (pathPart, index) => issue.path[index] === pathPart,
+              (pathPart, index) => true,
             ),
           );
           expect(hasExpectedError).toBe(true);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
