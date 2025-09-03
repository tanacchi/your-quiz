# Mutant 7bbb4ad8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4332
**Stable ID**: 7bbb4ad8
**Location**: L210:15–L210:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4332
@@ -206,9 +206,9 @@
           const input = { ...validQuizSummaryInput, status: "pending" };
           const patches = suggestStatusPatches(input.status);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
+          if (false) throw new Error("Expected patch to exist");
           const patched = applyEntityPatch(input, patch);
 
           expect(patched.status).toBe("pending_approval");
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
