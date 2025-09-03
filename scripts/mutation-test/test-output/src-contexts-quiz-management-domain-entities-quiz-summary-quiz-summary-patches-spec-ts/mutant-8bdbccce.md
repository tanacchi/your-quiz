# Mutant 8bdbccce Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4651
**Stable ID**: 8bdbccce
**Location**: L550:24–L550:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4651
@@ -546,9 +546,9 @@
             question: "Valid question",
             answerType: "single_choice" as const,
             solutionId: "solution-456",
             creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
+            createdAt: "",
           };
 
           const issues: Issue[] = [
             { path: ["status"], code: "invalid", message: "Invalid status" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
