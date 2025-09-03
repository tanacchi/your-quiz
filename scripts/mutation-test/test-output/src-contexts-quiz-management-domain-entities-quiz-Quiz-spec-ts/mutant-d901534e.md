# Mutant d901534e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1497
**Stable ID**: d901534e
**Location**: L790:32–L790:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1497
@@ -786,9 +786,9 @@
           }).not.toThrow();
 
           // Should not crash when valid patch is provided
           expect(() => {
-            draft.applyPatches([{ explanation: "Test explanation" }]);
+            draft.applyPatches([]);
           }).not.toThrow();
         });
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
