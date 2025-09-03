# Mutant 1b5949f4 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5814
**Stable ID**: 1b5949f4
**Location**: L83:27–L83:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5814
@@ -79,9 +79,9 @@
 
     describe("Value Field Validation", () => {
       it.each([
         ["true boolean", true, true],
-        ["false boolean", false, true],
+        ["false boolean", true, true],
         ["string 'true'", "true", false],
         ["string 'false'", "false", false],
         ["number 1", 1, false],
         ["number 0", 0, false],
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
