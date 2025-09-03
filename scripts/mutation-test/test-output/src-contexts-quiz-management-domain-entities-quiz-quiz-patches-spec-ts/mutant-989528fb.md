# Mutant 989528fb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2139
**Stable ID**: 989528fb
**Location**: L450:72–L450:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2139
@@ -446,9 +446,9 @@
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
         ];
 
-        const nonObjectInputs = [null, undefined, "string", 123, true, []];
+        const nonObjectInputs = [null, undefined, "string", 123, true, ["Stryker was here"]];
 
         nonObjectInputs.forEach((input) => {
           const result = suggestQuizPatches(input, issues);
           expect(result).toEqual([]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
