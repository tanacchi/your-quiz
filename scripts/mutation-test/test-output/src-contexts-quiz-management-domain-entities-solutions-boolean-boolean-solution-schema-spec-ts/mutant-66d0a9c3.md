# Mutant 66d0a9c3 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5831
**Stable ID**: 66d0a9c3
**Location**: L88:10–L88:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5831
@@ -84,9 +84,9 @@
         ["string 'true'", "true", false],
         ["string 'false'", "false", false],
         ["number 1", 1, false],
         ["number 0", 0, false],
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
         ["empty string", "", false],
         ["object", {}, false],
         ["array", [], false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
