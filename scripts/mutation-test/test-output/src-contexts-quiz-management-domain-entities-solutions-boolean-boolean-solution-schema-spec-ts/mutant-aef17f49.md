# Mutant aef17f49 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5855
**Stable ID**: aef17f49
**Location**: L105:14–L105:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5855
@@ -101,9 +101,9 @@
         }
       });
     });
 
-    describe("Strict Mode", () => {
+    describe("", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validBooleanSolutionData,
           extraField: "not allowed",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
