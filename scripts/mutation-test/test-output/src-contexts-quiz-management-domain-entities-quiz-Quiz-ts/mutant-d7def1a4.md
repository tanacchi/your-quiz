# Mutant d7def1a4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: ObjectLiteral
**Original ID**: 1625
**Stable ID**: d7def1a4
**Location**: L164:37–L174:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1625
@@ -160,19 +160,9 @@
    * @returns QuizParseResult containing rejected Quiz or QuizParseError
    */
   reject(_reason?: string): QuizParseResult {
     if (this.get("status") !== "pending_approval") {
-      const error: QuizParseError = {
-        kind: "parse",
-        issues: [
-          {
-            path: ["status"],
-            code: "custom",
-            message: `Quiz with status ${this.get("status")} cannot be rejected`,
-          },
-        ],
-        patches: [],
-      };
+      const error: QuizParseError = {};
       return err(error);
     }
 
     return this.update("status", "rejected");
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
