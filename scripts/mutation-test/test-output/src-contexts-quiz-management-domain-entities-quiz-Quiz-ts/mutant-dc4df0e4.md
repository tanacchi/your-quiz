# Mutant dc4df0e4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1633
**Stable ID**: dc4df0e4
**Location**: L170:51–L170:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1633
@@ -166,9 +166,9 @@
         issues: [
           {
             path: ["status"],
             code: "custom",
-            message: `Quiz with status ${this.get("status")} cannot be rejected`,
+            message: `Quiz with status ${this.get("")} cannot be rejected`,
           },
         ],
         patches: [],
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
