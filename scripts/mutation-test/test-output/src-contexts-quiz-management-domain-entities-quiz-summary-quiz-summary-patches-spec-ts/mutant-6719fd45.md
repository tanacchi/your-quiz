# Mutant 6719fd45 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4489
**Stable ID**: 6719fd45
**Location**: L398:19–L398:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4489
@@ -394,9 +394,9 @@
           solutionId: "  solution-456  ",
           creatorId: "  creator-789  ",
           answerType: "bool",
           status: "pending",
-          tagIds: ["valid", "", " trimmed "],
+          tagIds: [],
           approvedAt: undefined,
         };
 
         const issues: Issue[] = [
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
