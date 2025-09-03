# Mutant 7aa816f1 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5874
**Stable ID**: 7aa816f1
**Location**: L131:10–L131:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5874
@@ -127,9 +127,9 @@
 
   describe("Edge Cases and Boundary Values", () => {
     describe("ID Special Cases", () => {
       it.each([
-        ["special characters", "solution-!@#$%^&*()"],
+        ["", "solution-!@#$%^&*()"],
         ["unicode characters", "solution-プログラミング"],
         ["emoji", "solution-🚀"],
         ["very long id", `solution-${"a".repeat(100)}`],
         ["mixed case", "Solution-MixedCase-123"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
