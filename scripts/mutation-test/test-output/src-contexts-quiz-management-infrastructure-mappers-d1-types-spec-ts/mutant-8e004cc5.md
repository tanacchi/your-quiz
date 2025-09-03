# Mutant 8e004cc5 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7563
**Stable ID**: 8e004cc5
**Location**: L183:24–L183:42

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7563
@@ -179,9 +179,9 @@
       test("should handle optional fields correctly", () => {
         const baseRow = createValidQuizRow();
         const rowWithOptionals = {
           ...baseRow,
-          explanation: "Test explanation",
+          explanation: "",
           approved_at: "2023-01-02T00:00:00Z",
           boolean_value: true,
           correct_answer: "test",
           matching_strategy: "exact",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
