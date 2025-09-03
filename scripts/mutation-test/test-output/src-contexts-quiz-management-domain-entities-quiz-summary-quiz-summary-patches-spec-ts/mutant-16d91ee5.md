# Mutant 16d91ee5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4701
**Stable ID**: 16d91ee5
**Location**: L605:42–L608:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4701
@@ -601,12 +601,9 @@
         { path: ["question"], code: "invalid", message: "Invalid" },
         { path: ["answerType"], code: "invalid", message: "Invalid" },
       ];
 
-      malformedInputs.forEach((input) => {
-        const result = suggestQuizSummaryPatches(input, issues);
-        expect(Array.isArray(result)).toBe(true);
-      });
+      malformedInputs.forEach((input) => {});
     });
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizSummaryInput };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
