# Mutant 9b43ad0b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: StringLiteral
**Original ID**: 4897
**Stable ID**: 9b43ad0b
**Location**: L165:39–L165:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4897
@@ -161,9 +161,9 @@
   if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
   if (need("solutionId"))
     out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
   if (need("creatorId"))
-    out.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
+    out.push(...suggestIdFieldPatches("")(input.creatorId));
   if (need("answerType"))
     out.push(...suggestAnswerTypePatches(input.answerType));
   if (need("status")) out.push(...suggestStatusPatches(input.status));
   if (need("tagIds")) out.push(...suggestTagIdsPatches(input.tagIds));
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
