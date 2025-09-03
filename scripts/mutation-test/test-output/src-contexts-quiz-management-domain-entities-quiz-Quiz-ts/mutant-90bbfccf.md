# Mutant 90bbfccf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1630
**Stable ID**: 90bbfccf
**Location**: L168:20–L168:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1630
@@ -164,9 +164,9 @@
       const error: QuizParseError = {
         kind: "parse",
         issues: [
           {
-            path: ["status"],
+            path: [""],
             code: "custom",
             message: `Quiz with status ${this.get("status")} cannot be rejected`,
           },
         ],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
