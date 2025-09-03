# Mutant a689541f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 3972
**Stable ID**: a689541f
**Location**: L168:19–L168:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3972
@@ -164,9 +164,9 @@
         kind: "parse",
         issues: [
           {
             path: ["status"],
-            code: "custom",
+            code: "",
             message: `Quiz with status ${this.get("status")} cannot be approved`,
           },
         ],
         patches: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
