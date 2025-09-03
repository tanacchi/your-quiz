# Mutant b12da32a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: LogicalOperator
**Original ID**: 2655
**Stable ID**: b12da32a
**Location**: L92:9–L92:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2655
@@ -88,9 +88,9 @@
     "maru_batsu",
   ];
 
   for (const pattern of booleanPatterns) {
-    if (answerType.includes(pattern) || answerType === pattern) {
+    if (answerType.includes(pattern) && answerType === pattern) {
       patches.push({ answerType: "boolean" });
       break;
     }
   }
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
