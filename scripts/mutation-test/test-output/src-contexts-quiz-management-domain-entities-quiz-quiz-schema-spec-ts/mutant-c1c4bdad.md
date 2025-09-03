# Mutant c1c4bdad Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2994
**Stable ID**: c1c4bdad
**Location**: L183:10–L183:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2994
@@ -179,9 +179,9 @@
       });
     });
 
     describe("Explanation Field", () => {
-      it("should accept valid explanation", () => {
+      it("", () => {
         const data = {
           ...validQuizData,
           explanation: "Detailed explanation about TypeScript",
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
