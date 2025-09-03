# Mutant abe547b1 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5965
**Stable ID**: abe547b1
**Location**: L215:8–L215:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5965
@@ -211,9 +211,9 @@
     });
   });
 
   describe("Integration Scenarios", () => {
-    it("should handle typical quiz solution scenarios", () => {
+    it("", () => {
       const quizSolutions = [
         { id: "solution-correct-answer", value: true },
         { id: "solution-incorrect-answer", value: false },
         { id: "solution-yes-no-yes", value: true },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
