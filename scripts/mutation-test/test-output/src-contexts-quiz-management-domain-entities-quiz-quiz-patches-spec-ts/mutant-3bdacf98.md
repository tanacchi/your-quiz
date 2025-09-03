# Mutant 3bdacf98 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1800
**Stable ID**: 3bdacf98
**Location**: L146:16–L146:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1800
@@ -142,9 +142,9 @@
           expect(result).toEqual(expected);
         });
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply id trim patch correctly", () => {
           const input = { ...validQuizInput, id: "  quiz-123  " };
           const patches = suggestIdFieldPatches("id")(input.id);
           const patched = applyEntityPatch(input, patches.at(0) ?? {});
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
