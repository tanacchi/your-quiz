# Mutant 0efab079 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2314
**Stable ID**: 0efab079
**Location**: L597:24–L597:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2314
@@ -593,9 +593,9 @@
             question: "",
             answerType: "bool" as "boolean",
             status: "pending" as "pending_approval",
             solution: null as unknown as BooleanSolutionData,
-            creatorId: "creator-789",
+            creatorId: "",
             createdAt: "2023-12-01T10:00:00.000Z",
           };
 
           const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
