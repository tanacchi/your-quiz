# Mutant eae71b9e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5789
**Stable ID**: eae71b9e
**Location**: L66:10–L66:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5789
@@ -62,9 +62,9 @@
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
         ["undefined value", undefined, false],
-        ["number", 123, false],
+        ["", 123, false],
         ["object", {}, false],
         ["boolean", true, false],
       ])("should validate id: %s -> %s", (_desc, id, isValid) => {
         const data = { ...validBooleanSolutionData, id };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
