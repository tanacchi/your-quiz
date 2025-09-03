# Mutant 5ab11109 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2772
**Stable ID**: 5ab11109
**Location**: L12:10–L12:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2772
@@ -8,9 +8,9 @@
   type QuizInput,
   QuizSchema,
 } from "./quiz-schema";
 
-describe("Quiz Schema", () => {
+describe("", () => {
   const validBooleanSolution = {
     id: "solution-123",
     value: true,
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
