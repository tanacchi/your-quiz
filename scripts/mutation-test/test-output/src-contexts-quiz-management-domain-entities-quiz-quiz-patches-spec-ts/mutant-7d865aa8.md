# Mutant 7d865aa8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2436
**Stable ID**: 7d865aa8
**Location**: L738:9–L738:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2436
@@ -734,9 +734,9 @@
 
     it("should handle malformed input objects", () => {
       const malformedInputs = [
         { question: null, answerType: undefined, solution: "invalid" },
-        { id: [], creatorId: {}, solution: 123 },
+        {},
       ];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
