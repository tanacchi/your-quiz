# Mutant af7fdf9f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5963
**Stable ID**: af7fdf9f
**Location**: L214:12–L214:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5963
@@ -210,9 +210,9 @@
       });
     });
   });
 
-  describe("Integration Scenarios", () => {
+  describe("", () => {
     it("should handle typical quiz solution scenarios", () => {
       const quizSolutions = [
         { id: "solution-correct-answer", value: true },
         { id: "solution-incorrect-answer", value: false },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
