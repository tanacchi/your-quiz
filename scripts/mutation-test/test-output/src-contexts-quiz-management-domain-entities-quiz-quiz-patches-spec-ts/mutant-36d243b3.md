# Mutant 36d243b3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2431
**Stable ID**: 36d243b3
**Location**: L735:8–L735:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2431
@@ -731,9 +731,9 @@
       // Should still include consistency patches
       expect(Array.isArray(result)).toBe(true);
     });
 
-    it("should handle malformed input objects", () => {
+    it("", () => {
       const malformedInputs = [
         { question: null, answerType: undefined, solution: "invalid" },
         { id: [], creatorId: {}, solution: 123 },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
