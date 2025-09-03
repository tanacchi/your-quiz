# Mutant ffd206de Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2466
**Stable ID**: ffd206de
**Location**: L770:12–L770:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2466
@@ -766,9 +766,9 @@
       expect(patched.answerType).toBe(input.answerType);
     });
   });
 
-  describe("Performance and Large Data Handling", () => {
+  describe("", () => {
     it("should handle large number of issues efficiently", () => {
       const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
         path: ["question"],
         code: `error-${i}`,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
