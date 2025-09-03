# Mutant 750d302a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2437
**Stable ID**: 750d302a
**Location**: L738:15–L738:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2437
@@ -734,9 +734,9 @@
 
     it("should handle malformed input objects", () => {
       const malformedInputs = [
         { question: null, answerType: undefined, solution: "invalid" },
-        { id: [], creatorId: {}, solution: 123 },
+        { id: ["Stryker was here"], creatorId: {}, solution: 123 },
       ];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
