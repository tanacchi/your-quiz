# Mutant ee5b1be2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2137
**Stable ID**: ee5b1be2
**Location**: L450:51–L450:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2137
@@ -446,9 +446,9 @@
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
         ];
 
-        const nonObjectInputs = [null, undefined, "string", 123, true, []];
+        const nonObjectInputs = [null, undefined, "", 123, true, []];
 
         nonObjectInputs.forEach((input) => {
           const result = suggestQuizPatches(input, issues);
           expect(result).toEqual([]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
