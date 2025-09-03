# Mutant d784aa6d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2476
**Stable ID**: d784aa6d
**Location**: L775:18–L775:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2476
@@ -771,9 +771,9 @@
     it("should handle large number of issues efficiently", () => {
       const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
         path: ["question"],
         code: `error-${i}`,
-        message: `Error ${i}`,
+        message: ``,
       }));
 
       const result = suggestQuizPatches(
         {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
