# Mutant f0e38aac Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 4907
**Stable ID**: f0e38aac
**Location**: L170:7–L170:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.ts	mutated #4907
@@ -166,8 +166,8 @@
   if (need("answerType"))
     out.push(...suggestAnswerTypePatches(input.answerType));
   if (need("status")) out.push(...suggestStatusPatches(input.status));
   if (need("tagIds")) out.push(...suggestTagIdsPatches(input.tagIds));
-  if (need("approvedAt")) out.push(...suggestApprovedAtPatches(input));
+  if (true) out.push(...suggestApprovedAtPatches(input));
 
   return out;
 };
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
