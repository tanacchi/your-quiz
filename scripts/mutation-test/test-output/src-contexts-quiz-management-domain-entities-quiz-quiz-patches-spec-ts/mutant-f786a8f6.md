# Mutant f786a8f6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1710
**Stable ID**: f786a8f6
**Location**: L69:12–L69:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1710
@@ -65,9 +65,9 @@
 
           expect(patched.question).toBe("Untrimmed question?");
         });
 
-        it("should apply sample question patch correctly", () => {
+        it("", () => {
           const input = { ...validQuizInput, question: "" };
           const patches = suggestQuestionPatches(input.question);
           const patch = patches[0];
           if (!patch) throw new Error("Expected patch to exist");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
