# Mutant aa43aceb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1045
**Stable ID**: aa43aceb
**Location**: L178:10–L178:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1045
@@ -174,9 +174,9 @@
       });
     });
 
     describe("Permission Checks", () => {
-      it("should allow updates for pending approval quiz", () => {
+      it("", () => {
         expect(quiz.canBeUpdated()).toBe(true);
       });
 
       it("should prevent updates for approved quiz", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
