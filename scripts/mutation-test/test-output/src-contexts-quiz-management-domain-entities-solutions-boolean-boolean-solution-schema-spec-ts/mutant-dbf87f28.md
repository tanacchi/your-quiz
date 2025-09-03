# Mutant dbf87f28 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5767
**Stable ID**: dbf87f28
**Location**: L56:10–L56:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5767
@@ -52,9 +52,9 @@
       it.each([
         ["valid alphanumeric", "solution-123", true],
         ["valid with underscore", "solution_test", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["valid single char", "s", true],
+        ["", "s", true],
         [
           "valid long id",
           "solution-very-long-identifier-with-many-parts",
           true,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
