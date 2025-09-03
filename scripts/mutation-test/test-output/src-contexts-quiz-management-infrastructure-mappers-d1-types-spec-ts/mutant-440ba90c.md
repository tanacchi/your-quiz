# Mutant 440ba90c Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7564
**Stable ID**: 440ba90c
**Location**: L184:24–L184:46

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7564
@@ -180,9 +180,9 @@
         const baseRow = createValidQuizRow();
         const rowWithOptionals = {
           ...baseRow,
           explanation: "Test explanation",
-          approved_at: "2023-01-02T00:00:00Z",
+          approved_at: "",
           boolean_value: true,
           correct_answer: "test",
           matching_strategy: "exact",
           case_sensitive: false,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
