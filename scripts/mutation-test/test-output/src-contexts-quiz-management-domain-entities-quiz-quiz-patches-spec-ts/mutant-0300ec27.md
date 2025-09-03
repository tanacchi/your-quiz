# Mutant 0300ec27 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1803
**Stable ID**: 0300ec27
**Location**: L147:58–L153:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1803
@@ -143,15 +143,9 @@
         });
       });
 
       describe("Patch Application", () => {
-        it("should apply id trim patch correctly", () => {
-          const input = { ...validQuizInput, id: "  quiz-123  " };
-          const patches = suggestIdFieldPatches("id")(input.id);
-          const patched = applyEntityPatch(input, patches.at(0) ?? {});
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
