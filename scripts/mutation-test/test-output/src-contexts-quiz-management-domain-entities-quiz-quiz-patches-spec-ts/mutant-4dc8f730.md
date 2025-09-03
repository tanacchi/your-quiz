# Mutant 4dc8f730 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2129
**Stable ID**: 4dc8f730
**Location**: L445:66–L456:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2129
@@ -441,21 +441,10 @@
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizPatches", () => {
-      it("should return empty array for non-object input", () => {
-        const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid" },
-        ];
+      it("should return empty array for non-object input", () => {});
 
-        const nonObjectInputs = [null, undefined, "string", 123, true, []];
-
-        nonObjectInputs.forEach((input) => {
-          const result = suggestQuizPatches(input, issues);
-          expect(result).toEqual([]);
-        });
-      });
-
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
           id: "  quiz-123  ",
           question: "  Valid question?  ",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
