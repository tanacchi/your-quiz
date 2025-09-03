# Mutant f4b5d864 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1000
**Stable ID**: f4b5d864
**Location**: L121:12–L121:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1000
@@ -117,9 +117,9 @@
       }
     });
   });
 
-  describe("Business Logic", () => {
+  describe("", () => {
     let quiz: Quiz;
 
     beforeEach(() => {
       const result = Quiz.from(validQuizData);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
