# Mutant 03244e0b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1344
**Stable ID**: 03244e0b
**Location**: L578:12–L578:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1344
@@ -574,9 +574,9 @@
         });
       });
 
       describe("Edge Cases", () => {
-        it("should handle empty draft", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
