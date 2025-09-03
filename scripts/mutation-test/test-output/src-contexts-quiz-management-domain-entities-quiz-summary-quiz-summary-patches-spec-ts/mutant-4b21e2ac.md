# Mutant 4b21e2ac Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4107
**Stable ID**: 4b21e2ac
**Location**: L64:66–L73:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4107
@@ -60,18 +60,9 @@
 
           expect(patched.question).toBe("Untrimmed");
         });
 
-        it("should apply sample question patch correctly", () => {
-          const input = { ...validQuizSummaryInput, question: "" };
-          const patches = suggestQuestionPatches(input.question);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.question).toBe("Sample question");
-        });
+        it("should apply sample question patch correctly", () => {});
       });
     });
 
     describe("suggestExplanationPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
