# Mutant 76e53f15 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1041
**Stable ID**: 76e53f15
**Location**: L172:19–L172:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1041
@@ -168,9 +168,9 @@
         expect(approvedResult.isOk()).toBe(true);
 
         const rejectionResult = approvedResult
           ._unsafeUnwrap()
-          .reject("Too late");
+          .reject("");
         expect(rejectionResult.isErr()).toBe(true);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
