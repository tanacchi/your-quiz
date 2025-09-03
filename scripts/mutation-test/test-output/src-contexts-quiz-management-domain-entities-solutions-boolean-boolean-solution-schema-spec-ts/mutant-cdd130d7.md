# Mutant cdd130d7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6000
**Stable ID**: cdd130d7
**Location**: L245:18–L245:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6000
@@ -241,9 +241,9 @@
           value: true,
         },
         {
           id: "550e8400-e29b-41d4-a716-446655440000",
-          value: false,
+          value: true,
         },
         {
           id: "solution_with_underscores_and_numbers_123",
           value: true,
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
