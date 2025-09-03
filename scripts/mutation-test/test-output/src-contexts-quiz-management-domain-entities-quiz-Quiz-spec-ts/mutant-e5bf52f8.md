# Mutant e5bf52f8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1496
**Stable ID**: e5bf52f8
**Location**: L789:24–L791:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1496
@@ -785,11 +785,9 @@
             draft.applyPatches([]);
           }).not.toThrow();
 
           // Should not crash when valid patch is provided
-          expect(() => {
-            draft.applyPatches([{ explanation: "Test explanation" }]);
-          }).not.toThrow();
+          expect(() => {}).not.toThrow();
         });
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
