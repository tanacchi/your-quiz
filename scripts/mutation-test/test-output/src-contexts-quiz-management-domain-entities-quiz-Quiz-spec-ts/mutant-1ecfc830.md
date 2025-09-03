# Mutant 1ecfc830 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1553
**Stable ID**: 1ecfc830
**Location**: L841:8–L841:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1553
@@ -837,9 +837,9 @@
         }
       }
     });
 
-    it("should suggest status fixes", () => {
+    it("", () => {
       const result = Quiz.from({
         ...validQuizData,
         status: "pending",
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
