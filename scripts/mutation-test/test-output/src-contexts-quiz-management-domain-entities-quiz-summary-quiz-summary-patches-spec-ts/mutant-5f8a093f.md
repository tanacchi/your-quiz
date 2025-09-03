# Mutant 5f8a093f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4190
**Stable ID**: 5f8a093f
**Location**: L135:58–L144:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4190
@@ -131,18 +131,9 @@
         });
       });
 
       describe("Patch Application", () => {
-        it("should apply id trim patch correctly", () => {
-          const input = { ...validQuizSummaryInput, id: "  quiz-123  " };
-          const patches = suggestIdFieldPatches("id")(input.id);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.id).toBe("quiz-123");
-        });
+        it("should apply id trim patch correctly", () => {});
       });
     });
 
     describe("suggestAnswerTypePatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
