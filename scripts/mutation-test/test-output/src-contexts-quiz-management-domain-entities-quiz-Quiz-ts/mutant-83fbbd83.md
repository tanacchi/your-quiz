# Mutant 83fbbd83 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1612
**Stable ID**: 83fbbd83
**Location**: L141:19–L141:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1612
@@ -137,9 +137,9 @@
         kind: "invalid_state",
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
