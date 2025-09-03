# Mutant 4a83af80 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2443
**Stable ID**: 4a83af80
**Location**: L742:57–L742:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2443
@@ -738,9 +738,9 @@
         { id: [], creatorId: {}, solution: 123 },
       ];
 
       const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
+        { path: ["question"], code: "invalid", message: "" },
         { path: ["solution"], code: "invalid", message: "Invalid" },
       ];
 
       malformedInputs.forEach((input) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
