# Mutant 46dd60b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3166
**Stable ID**: 46dd60b6
**Location**: L370:10–L370:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3166
@@ -366,9 +366,9 @@
       });
     });
 
     describe("Boundary Value Testing", () => {
-      it("should handle minimum valid question length", () => {
+      it("", () => {
         const minimalData = {
           ...validQuizData,
           question: "A", // 1 character after trim
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
