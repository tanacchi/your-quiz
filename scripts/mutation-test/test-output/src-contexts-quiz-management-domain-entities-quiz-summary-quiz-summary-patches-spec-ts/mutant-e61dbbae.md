# Mutant e61dbbae Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4103
**Stable ID**: e61dbbae
**Location**: L58:15–L58:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4103
@@ -54,9 +54,9 @@
           const input = { ...validQuizSummaryInput, question: "  Untrimmed  " };
           const patches = suggestQuestionPatches(input.question);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
+          if (false) throw new Error("Expected patch to exist");
           const patched = applyEntityPatch(input, patch);
 
           expect(patched.question).toBe("Untrimmed");
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
