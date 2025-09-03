# Mutant ce8fd9c1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1631
**Stable ID**: ce8fd9c1
**Location**: L169:19–L169:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1631
@@ -165,9 +165,9 @@
         kind: "parse",
         issues: [
           {
             path: ["status"],
-            code: "custom",
+            code: "",
             message: `Quiz with status ${this.get("status")} cannot be rejected`,
           },
         ],
         patches: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
