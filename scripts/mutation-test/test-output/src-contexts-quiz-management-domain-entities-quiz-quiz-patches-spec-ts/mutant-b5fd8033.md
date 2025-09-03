# Mutant b5fd8033 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1802
**Stable ID**: b5fd8033
**Location**: L147:12–L147:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1802
@@ -143,9 +143,9 @@
         });
       });
 
       describe("Patch Application", () => {
-        it("should apply id trim patch correctly", () => {
+        it("", () => {
           const input = { ...validQuizInput, id: "  quiz-123  " };
           const patches = suggestIdFieldPatches("id")(input.id);
           const patched = applyEntityPatch(input, patches.at(0) ?? {});
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
