# Mutant 639815ab Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5837
**Stable ID**: 639815ab
**Location**: L90:10–L90:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5837
@@ -86,9 +86,9 @@
         ["number 1", 1, false],
         ["number 0", 0, false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-        ["empty string", "", false],
+        ["", "", false],
         ["object", {}, false],
         ["array", [], false],
       ])("should validate value: %s -> %s", (_desc, value, isValid) => {
         const data = { ...validBooleanSolutionData, value };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
