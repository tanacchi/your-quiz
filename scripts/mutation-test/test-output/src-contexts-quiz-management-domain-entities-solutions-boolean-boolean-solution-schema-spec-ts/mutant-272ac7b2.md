# Mutant 272ac7b2 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5902
**Stable ID**: 272ac7b2
**Location**: L149:14–L149:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5902
@@ -145,9 +145,9 @@
         }
       });
     });
 
-    describe("Minimal Valid Data", () => {
+    describe("", () => {
       it("should accept minimal valid data with single character id", () => {
         const minimalData = {
           id: "s",
           value: true,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
