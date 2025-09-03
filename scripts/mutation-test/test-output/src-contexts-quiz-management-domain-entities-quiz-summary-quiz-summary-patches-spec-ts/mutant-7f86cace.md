# Mutant 7f86cace Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4327
**Stable ID**: 7f86cace
**Location**: L205:68–L214:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4327
@@ -201,18 +201,9 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply status correction patch correctly", () => {
-          const input = { ...validQuizSummaryInput, status: "pending" };
-          const patches = suggestStatusPatches(input.status);
-          expect(patches).toHaveLength(1);
-          const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
-          const patched = applyEntityPatch(input, patch);
-
-          expect(patched.status).toBe("pending_approval");
-        });
+        it("should apply status correction patch correctly", () => {});
       });
     });
 
     describe("suggestTagIdsPatches", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
