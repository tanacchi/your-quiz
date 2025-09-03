# Mutant 66c4141d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2440
**Stable ID**: 66c4141d
**Location**: L742:17–L742:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2440
@@ -738,9 +738,9 @@
         { id: [], creatorId: {}, solution: 123 },
       ];
 
       const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
         { path: ["solution"], code: "invalid", message: "Invalid" },
       ];
 
       malformedInputs.forEach((input) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
