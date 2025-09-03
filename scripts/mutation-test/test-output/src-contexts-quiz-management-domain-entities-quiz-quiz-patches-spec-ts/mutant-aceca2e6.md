# Mutant aceca2e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2142
**Stable ID**: aceca2e6
**Location**: L458:10–L458:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2142
@@ -454,9 +454,9 @@
           expect(result).toEqual([]);
         });
       });
 
-      it("should only suggest patches for fields mentioned in issues", () => {
+      it("", () => {
         const input = {
           id: "  quiz-123  ",
           question: "  Valid question?  ",
           answerType: "bool",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
