# Mutant 4f0e2efb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: ObjectLiteral
**Original ID**: 1628
**Stable ID**: 4f0e2efb
**Location**: L167:11–L171:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1628
@@ -163,13 +163,9 @@
     if (this.get("status") !== "pending_approval") {
       const error: QuizParseError = {
         kind: "parse",
         issues: [
-          {
-            path: ["status"],
-            code: "custom",
-            message: `Quiz with status ${this.get("status")} cannot be rejected`,
-          },
+          {},
         ],
         patches: [],
       };
       return err(error);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
