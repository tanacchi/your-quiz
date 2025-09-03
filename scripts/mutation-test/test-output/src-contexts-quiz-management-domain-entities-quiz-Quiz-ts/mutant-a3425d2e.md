# Mutant a3425d2e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1613
**Stable ID**: a3425d2e
**Location**: L142:22–L142:81

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1613
@@ -138,9 +138,9 @@
         issues: [
           {
             path: ["status"],
             code: "custom",
-            message: `Quiz with status ${this.get("status")} cannot be approved`,
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
