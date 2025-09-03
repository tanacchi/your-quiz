# Mutant bc02ae10 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1627
**Stable ID**: bc02ae10
**Location**: L166:17–L172:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1627
@@ -162,15 +162,9 @@
   reject(_reason?: string): QuizParseResult {
     if (this.get("status") !== "pending_approval") {
       const error: QuizParseError = {
         kind: "parse",
-        issues: [
-          {
-            path: ["status"],
-            code: "custom",
-            message: `Quiz with status ${this.get("status")} cannot be rejected`,
-          },
-        ],
+        issues: [],
         patches: [],
       };
       return err(error);
     }
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
