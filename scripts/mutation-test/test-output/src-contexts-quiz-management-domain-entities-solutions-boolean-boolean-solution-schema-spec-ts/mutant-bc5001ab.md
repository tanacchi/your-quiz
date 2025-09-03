# Mutant bc5001ab Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5838
**Stable ID**: bc5001ab
**Location**: L90:26–L90:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5838
@@ -86,9 +86,9 @@
         ["number 1", 1, false],
         ["number 0", 0, false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-        ["empty string", "", false],
+        ["empty string", "Stryker was here!", false],
         ["object", {}, false],
         ["array", [], false],
       ])("should validate value: %s -> %s", (_desc, value, isValid) => {
         const data = { ...validBooleanSolutionData, value };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
