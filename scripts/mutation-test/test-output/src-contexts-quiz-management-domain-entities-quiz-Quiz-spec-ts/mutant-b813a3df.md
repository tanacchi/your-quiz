# Mutant b813a3df Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1499
**Stable ID**: b813a3df
**Location**: L790:48–L790:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1499
@@ -786,9 +786,9 @@
           }).not.toThrow();
 
           // Should not crash when valid patch is provided
           expect(() => {
-            draft.applyPatches([{ explanation: "Test explanation" }]);
+            draft.applyPatches([{ explanation: "" }]);
           }).not.toThrow();
         });
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
