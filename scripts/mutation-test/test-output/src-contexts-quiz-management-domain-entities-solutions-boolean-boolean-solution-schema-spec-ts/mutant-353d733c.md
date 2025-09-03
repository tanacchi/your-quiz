# Mutant 353d733c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5877
**Stable ID**: 353d733c
**Location**: L132:10–L132:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5877
@@ -128,9 +128,9 @@
   describe("Edge Cases and Boundary Values", () => {
     describe("ID Special Cases", () => {
       it.each([
         ["special characters", "solution-!@#$%^&*()"],
-        ["unicode characters", "solution-プログラミング"],
+        ["", "solution-プログラミング"],
         ["emoji", "solution-🚀"],
         ["very long id", `solution-${"a".repeat(100)}`],
         ["mixed case", "Solution-MixedCase-123"],
         ["numbers only", "123456789"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
