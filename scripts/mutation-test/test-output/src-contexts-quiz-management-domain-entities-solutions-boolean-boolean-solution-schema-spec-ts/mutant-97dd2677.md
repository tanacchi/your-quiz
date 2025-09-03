# Mutant 97dd2677 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5818
**Stable ID**: 97dd2677
**Location**: L84:27–L84:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5818
@@ -80,9 +80,9 @@
     describe("Value Field Validation", () => {
       it.each([
         ["true boolean", true, true],
         ["false boolean", false, true],
-        ["string 'true'", "true", false],
+        ["string 'true'", "", false],
         ["string 'false'", "false", false],
         ["number 1", 1, false],
         ["number 0", 0, false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
