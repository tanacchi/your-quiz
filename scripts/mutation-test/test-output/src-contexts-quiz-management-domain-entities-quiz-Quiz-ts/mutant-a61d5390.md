# Mutant a61d5390 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1629
**Stable ID**: a61d5390
**Location**: L168:19–L168:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1629
@@ -164,9 +164,9 @@
       const error: QuizParseError = {
         kind: "parse",
         issues: [
           {
-            path: ["status"],
+            path: [],
             code: "custom",
             message: `Quiz with status ${this.get("status")} cannot be rejected`,
           },
         ],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
