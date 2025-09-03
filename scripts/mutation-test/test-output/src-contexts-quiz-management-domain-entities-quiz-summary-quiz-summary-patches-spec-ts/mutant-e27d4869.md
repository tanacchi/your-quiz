# Mutant e27d4869 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4492
**Stable ID**: e27d4869
**Location**: L398:33–L398:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4492
@@ -394,9 +394,9 @@
           solutionId: "  solution-456  ",
           creatorId: "  creator-789  ",
           answerType: "bool",
           status: "pending",
-          tagIds: ["valid", "", " trimmed "],
+          tagIds: ["valid", "", ""],
           approvedAt: undefined,
         };
 
         const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
