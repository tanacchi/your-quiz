# Mutant 4b6228fe Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1801
**Stable ID**: 4b6228fe
**Location**: L146:43–L154:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1801
@@ -142,17 +142,9 @@
           expect(result).toEqual(expected);
         });
       });
 
-      describe("Patch Application", () => {
-        it("should apply id trim patch correctly", () => {
-          const input = { ...validQuizInput, id: "  quiz-123  " };
-          const patches = suggestIdFieldPatches("id")(input.id);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
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
