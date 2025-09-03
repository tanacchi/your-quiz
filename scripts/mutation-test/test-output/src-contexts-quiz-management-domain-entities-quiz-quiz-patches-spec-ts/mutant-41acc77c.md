# Mutant 41acc77c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2438
**Stable ID**: 41acc77c
**Location**: L741:31–L744:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2438
@@ -737,12 +737,9 @@
         { question: null, answerType: undefined, solution: "invalid" },
         { id: [], creatorId: {}, solution: 123 },
       ];
 
-      const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
-        { path: ["solution"], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       malformedInputs.forEach((input) => {
         const result = suggestQuizPatches(input, issues);
         expect(Array.isArray(result)).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
