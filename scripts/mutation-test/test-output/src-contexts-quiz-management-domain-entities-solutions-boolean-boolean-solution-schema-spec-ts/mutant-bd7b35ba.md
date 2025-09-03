# Mutant bd7b35ba Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5828
**Stable ID**: bd7b35ba
**Location**: L87:10–L87:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5828
@@ -83,9 +83,9 @@
         ["false boolean", false, true],
         ["string 'true'", "true", false],
         ["string 'false'", "false", false],
         ["number 1", 1, false],
-        ["number 0", 0, false],
+        ["", 0, false],
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["empty string", "", false],
         ["object", {}, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
