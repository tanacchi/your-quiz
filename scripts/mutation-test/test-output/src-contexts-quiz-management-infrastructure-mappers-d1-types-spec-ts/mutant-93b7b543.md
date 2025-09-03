# Mutant 93b7b543 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 7565
**Stable ID**: 93b7b543
**Location**: L185:26–L185:30

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7565
@@ -181,9 +181,9 @@
         const rowWithOptionals = {
           ...baseRow,
           explanation: "Test explanation",
           approved_at: "2023-01-02T00:00:00Z",
-          boolean_value: true,
+          boolean_value: false,
           correct_answer: "test",
           matching_strategy: "exact",
           case_sensitive: false,
           choices: '{"test": "value"}',
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
