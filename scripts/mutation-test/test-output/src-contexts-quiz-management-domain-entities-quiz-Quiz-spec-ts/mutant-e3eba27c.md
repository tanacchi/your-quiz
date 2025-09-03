# Mutant e3eba27c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 941
**Stable ID**: e3eba27c
**Location**: L49:12–L49:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #941
@@ -45,9 +45,9 @@
       });
     });
   });
 
-  describe("Entity Creation", () => {
+  describe("", () => {
     it("should create valid quiz from complete data", () => {
       const result = Quiz.from(validQuizData);
       expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
