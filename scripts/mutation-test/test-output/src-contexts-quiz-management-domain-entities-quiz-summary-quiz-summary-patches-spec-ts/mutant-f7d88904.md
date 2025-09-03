# Mutant f7d88904 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4444
**Stable ID**: f7d88904
**Location**: L350:66–L361:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4444
@@ -346,21 +346,10 @@
   });
 
   describe("Integrated Patch Suggester", () => {
     describe("suggestQuizSummaryPatches", () => {
-      it("should return empty array for non-object input", () => {
-        const issues: Issue[] = [
-          { path: ["question"], code: "invalid", message: "Invalid" },
-        ];
+      it("should return empty array for non-object input", () => {});
 
-        const nonObjectInputs = [null, undefined, "string", 123, true, []];
-
-        nonObjectInputs.forEach((input) => {
-          const result = suggestQuizSummaryPatches(input, issues);
-          expect(result).toEqual([]);
-        });
-      });
-
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
           id: "  quiz-123  ",
           question: "  Valid question  ",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
