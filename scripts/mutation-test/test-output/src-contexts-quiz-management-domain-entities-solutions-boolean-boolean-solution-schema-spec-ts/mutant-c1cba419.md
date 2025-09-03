# Mutant c1cba419 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5834
**Stable ID**: c1cba419
**Location**: L89:10–L89:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5834
@@ -85,9 +85,9 @@
         ["string 'false'", "false", false],
         ["number 1", 1, false],
         ["number 0", 0, false],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
         ["empty string", "", false],
         ["object", {}, false],
         ["array", [], false],
       ])("should validate value: %s -> %s", (_desc, value, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
