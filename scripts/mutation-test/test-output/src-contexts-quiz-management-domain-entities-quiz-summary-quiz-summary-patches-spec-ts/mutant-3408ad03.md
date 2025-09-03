# Mutant 3408ad03 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4375
**Stable ID**: 3408ad03
**Location**: L264:12–L264:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4375
@@ -260,9 +260,9 @@
 
           expect(patched.tagIds).toEqual([]);
         });
 
-        it("should apply function patch correctly", () => {
+        it("", () => {
           const input = {
             ...validQuizSummaryInput,
             tagIds: ["valid", "", " trimmed "],
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
