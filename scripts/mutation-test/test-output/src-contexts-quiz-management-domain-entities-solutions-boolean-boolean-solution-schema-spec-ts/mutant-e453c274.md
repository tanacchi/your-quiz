# Mutant e453c274 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5809
**Stable ID**: e453c274
**Location**: L82:10–L82:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5809
@@ -78,9 +78,9 @@
     });
 
     describe("Value Field Validation", () => {
       it.each([
-        ["true boolean", true, true],
+        ["", true, true],
         ["false boolean", false, true],
         ["string 'true'", "true", false],
         ["string 'false'", "false", false],
         ["number 1", 1, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
