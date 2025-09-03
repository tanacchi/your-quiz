# Mutant c19601c6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1719
**Stable ID**: c19601c6
**Location**: L79:12–L79:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1719
@@ -75,9 +75,9 @@
 
           expect(patched.question).toBe("Sample boolean question?");
         });
 
-        it("should apply truncation patch correctly", () => {
+        it("", () => {
           const longQuestion = "A".repeat(501);
           const input = { ...validQuizInput, question: longQuestion };
           const patches = suggestQuestionPatches(input.question);
           expect(patches.length).toBeGreaterThanOrEqual(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
