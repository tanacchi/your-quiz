# Mutant 898f09d5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5771
**Stable ID**: 898f09d5
**Location**: L58:11–L58:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5771
@@ -54,9 +54,9 @@
         ["valid with underscore", "solution_test", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "s", true],
         [
-          "valid long id",
+          "",
           "solution-very-long-identifier-with-many-parts",
           true,
         ],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
