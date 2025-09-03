# Mutant 553f351c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1498
**Stable ID**: 553f351c
**Location**: L790:33–L790:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1498
@@ -786,9 +786,9 @@
           }).not.toThrow();
 
           // Should not crash when valid patch is provided
           expect(() => {
-            draft.applyPatches([{ explanation: "Test explanation" }]);
+            draft.applyPatches([{}]);
           }).not.toThrow();
         });
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
