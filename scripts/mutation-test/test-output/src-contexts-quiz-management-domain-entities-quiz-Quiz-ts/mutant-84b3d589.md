# Mutant 84b3d589 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1614
**Stable ID**: 84b3d589
**Location**: L142:51–L142:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1614
@@ -138,9 +138,9 @@
         issues: [
           {
             path: ["status"],
             code: "custom",
-            message: `Quiz with status ${this.get("status")} cannot be approved`,
+            message: `Quiz with status ${this.get("")} cannot be approved`,
           },
         ],
         patches: [],
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
