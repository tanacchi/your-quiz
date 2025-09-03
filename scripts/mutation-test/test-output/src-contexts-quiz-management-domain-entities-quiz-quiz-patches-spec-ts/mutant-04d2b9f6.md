# Mutant 04d2b9f6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2468
**Stable ID**: 04d2b9f6
**Location**: L771:8–L771:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2468
@@ -767,9 +767,9 @@
     });
   });
 
   describe("Performance and Large Data Handling", () => {
-    it("should handle large number of issues efficiently", () => {
+    it("", () => {
       const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
         path: ["question"],
         code: `error-${i}`,
         message: `Error ${i}`,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
