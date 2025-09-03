# Mutant d838ce55 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1711
**Stable ID**: d838ce55
**Location**: L69:66–L77:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1711
@@ -65,18 +65,10 @@
 
           expect(patched.question).toBe("Untrimmed question?");
         });
 
-        it("should apply sample question patch correctly", () => {
-          const input = { ...validQuizInput, question: "" };
-          const patches = suggestQuestionPatches(input.question);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
+        it("should apply sample question patch correctly", () => {});
 
-          expect(patched.question).toBe("Sample boolean question?");
-        });
-
         it("should apply truncation patch correctly", () => {
           const longQuestion = "A".repeat(501);
           const input = { ...validQuizInput, question: longQuestion };
           const patches = suggestQuestionPatches(input.question);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
