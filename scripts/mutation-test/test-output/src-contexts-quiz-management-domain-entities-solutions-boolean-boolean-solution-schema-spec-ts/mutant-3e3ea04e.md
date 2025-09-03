# Mutant 3e3ea04e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5841
**Stable ID**: 3e3ea04e
**Location**: L91:10–L91:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5841
@@ -87,9 +87,9 @@
         ["number 0", 0, false],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["empty string", "", false],
-        ["object", {}, false],
+        ["", {}, false],
         ["array", [], false],
       ])("should validate value: %s -> %s", (_desc, value, isValid) => {
         const data = { ...validBooleanSolutionData, value };
         const result = BooleanSolutionSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
