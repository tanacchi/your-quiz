# Mutant f3ce264b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3195
**Stable ID**: f3ce264b
**Location**: L403:11–L403:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3195
@@ -399,9 +399,9 @@
       it.each([
         ["true value", { id: "sol-1", value: true }],
         ["false value", { id: "sol-2", value: false }],
         [
-          "complex id format",
+          "",
           {
             id: "solution-uuid-550e8400-e29b-41d4-a716-446655440000",
             value: true,
           },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
