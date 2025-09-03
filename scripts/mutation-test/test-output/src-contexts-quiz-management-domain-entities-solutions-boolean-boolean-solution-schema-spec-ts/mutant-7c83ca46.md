# Mutant 7c83ca46 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5813
**Stable ID**: 7c83ca46
**Location**: L83:10–L83:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5813
@@ -79,9 +79,9 @@
 
     describe("Value Field Validation", () => {
       it.each([
         ["true boolean", true, true],
-        ["false boolean", false, true],
+        ["", false, true],
         ["string 'true'", "true", false],
         ["string 'false'", "false", false],
         ["number 1", 1, false],
         ["number 0", 0, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
