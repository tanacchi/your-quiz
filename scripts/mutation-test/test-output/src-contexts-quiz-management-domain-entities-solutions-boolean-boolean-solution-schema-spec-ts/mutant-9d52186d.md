# Mutant 9d52186d Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6003
**Stable ID**: 9d52186d
**Location**: L249:18–L249:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6003
@@ -245,9 +245,9 @@
           value: false,
         },
         {
           id: "solution_with_underscores_and_numbers_123",
-          value: true,
+          value: false,
         },
       ];
 
       complexSolutions.forEach((solution) => {
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
