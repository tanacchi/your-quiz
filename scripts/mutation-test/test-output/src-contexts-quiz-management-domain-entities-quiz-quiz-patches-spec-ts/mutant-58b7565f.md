# Mutant 58b7565f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 2411
**Stable ID**: 58b7565f
**Location**: L710:18–L710:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2411
@@ -706,9 +706,9 @@
 
           expect(patched.question).toBe(`${"A".repeat(497)}...`);
           expect(patched.question?.length).toBe(500);
           expect(patched.explanation).toBe(`${"B".repeat(997)}...`);
-          expect(patched.explanation?.length).toBe(1000);
+          expect(patched.explanation.length).toBe(1000);
         });
       });
     });
   });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
