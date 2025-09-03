# Mutant 851e676c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5870
**Stable ID**: 851e676c
**Location**: L129:14–L129:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5870
@@ -125,9 +125,9 @@
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
-    describe("ID Special Cases", () => {
+    describe("", () => {
       it.each([
         ["special characters", "solution-!@#$%^&*()"],
         ["unicode characters", "solution-プログラミング"],
         ["emoji", "solution-🚀"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
