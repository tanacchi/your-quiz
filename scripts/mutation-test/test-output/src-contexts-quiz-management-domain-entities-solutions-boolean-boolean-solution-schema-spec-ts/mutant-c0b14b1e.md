# Mutant c0b14b1e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5763
**Stable ID**: c0b14b1e
**Location**: L55:10–L55:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5763
@@ -51,9 +51,9 @@
     describe("ID Field Validation", () => {
       it.each([
         ["valid alphanumeric", "solution-123", true],
         ["valid with underscore", "solution_test", true],
-        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
+        ["", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "s", true],
         [
           "valid long id",
           "solution-very-long-identifier-with-many-parts",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
