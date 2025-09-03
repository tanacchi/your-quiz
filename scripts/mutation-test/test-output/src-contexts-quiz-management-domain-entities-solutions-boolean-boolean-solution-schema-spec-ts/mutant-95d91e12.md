# Mutant 95d91e12 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5825
**Stable ID**: 95d91e12
**Location**: L86:10–L86:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5825
@@ -82,9 +82,9 @@
         ["true boolean", true, true],
         ["false boolean", false, true],
         ["string 'true'", "true", false],
         ["string 'false'", "false", false],
-        ["number 1", 1, false],
+        ["", 1, false],
         ["number 0", 0, false],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
