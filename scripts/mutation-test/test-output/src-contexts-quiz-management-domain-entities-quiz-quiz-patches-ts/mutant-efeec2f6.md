# Mutant efeec2f6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: ConditionalExpression
**Original ID**: 2656
**Stable ID**: efeec2f6
**Location**: L92:41–L92:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2656
@@ -88,9 +88,9 @@
     "maru_batsu",
   ];
 
   for (const pattern of booleanPatterns) {
-    if (answerType.includes(pattern) || answerType === pattern) {
+    if (answerType.includes(pattern) || false) {
       patches.push({ answerType: "boolean" });
       break;
     }
   }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
