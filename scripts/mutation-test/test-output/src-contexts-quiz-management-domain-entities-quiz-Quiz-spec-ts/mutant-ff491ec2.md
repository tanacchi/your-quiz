# Mutant ff491ec2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1550
**Stable ID**: ff491ec2
**Location**: L834:11–L834:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1550
@@ -830,9 +830,9 @@
         expect(answerTypePatch).toBeDefined();
         if (
           answerTypePatch &&
           typeof answerTypePatch === "object" &&
-          "answerType" in answerTypePatch
+          "" in answerTypePatch
         ) {
           expect(answerTypePatch.answerType).toBe("boolean");
         }
       }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
