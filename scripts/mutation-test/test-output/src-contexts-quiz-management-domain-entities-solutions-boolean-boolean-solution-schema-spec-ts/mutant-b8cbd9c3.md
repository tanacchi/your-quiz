# Mutant b8cbd9c3 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5759
**Stable ID**: b8cbd9c3
**Location**: L54:10–L54:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5759
@@ -50,9 +50,9 @@
 
     describe("ID Field Validation", () => {
       it.each([
         ["valid alphanumeric", "solution-123", true],
-        ["valid with underscore", "solution_test", true],
+        ["", "solution_test", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "s", true],
         [
           "valid long id",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
