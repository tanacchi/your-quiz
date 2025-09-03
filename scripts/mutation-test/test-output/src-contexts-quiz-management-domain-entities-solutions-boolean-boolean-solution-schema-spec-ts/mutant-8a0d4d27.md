# Mutant 8a0d4d27 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5970
**Stable ID**: 8a0d4d27
**Location**: L217:49–L217:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5970
@@ -213,9 +213,9 @@
 
   describe("Integration Scenarios", () => {
     it("should handle typical quiz solution scenarios", () => {
       const quizSolutions = [
-        { id: "solution-correct-answer", value: true },
+        { id: "solution-correct-answer", value: false },
         { id: "solution-incorrect-answer", value: false },
         { id: "solution-yes-no-yes", value: true },
         { id: "solution-yes-no-no", value: false },
         { id: "solution-true-false-true", value: true },
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
