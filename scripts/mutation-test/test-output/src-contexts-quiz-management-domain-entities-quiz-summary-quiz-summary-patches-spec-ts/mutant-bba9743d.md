# Mutant bba9743d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4188
**Stable ID**: bba9743d
**Location**: L134:43–L145:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4188
@@ -130,20 +130,9 @@
           expect(result).toEqual(expected);
         });
       });
 
-      describe("Patch Application", () => {
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
-      });
+      describe("Patch Application", () => {});
     });
 
     describe("suggestAnswerTypePatches", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
