# Mutant 2ca92fa7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1632
**Stable ID**: 2ca92fa7
**Location**: L170:22–L170:81

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1632
@@ -166,9 +166,9 @@
         issues: [
           {
             path: ["status"],
             code: "custom",
-            message: `Quiz with status ${this.get("status")} cannot be rejected`,
+            message: ``,
           },
         ],
         patches: [],
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
