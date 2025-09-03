# Mutant f55a05cd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 3989
**Stable ID**: f55a05cd
**Location**: L199:19–L199:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3989
@@ -195,9 +195,9 @@
         kind: "parse",
         issues: [
           {
             path: ["tagIds"],
-            code: "custom",
+            code: "",
             message: `Tag ${tagId} already exists`,
           },
         ],
         patches: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
