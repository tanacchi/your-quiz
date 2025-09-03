# Mutant 95f5c31e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 2408
**Stable ID**: 95f5c31e
**Location**: L708:18–L708:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2408
@@ -704,9 +704,9 @@
             throw new Error("patched must be an object.");
           }
 
           expect(patched.question).toBe(`${"A".repeat(497)}...`);
-          expect(patched.question?.length).toBe(500);
+          expect(patched.question.length).toBe(500);
           expect(patched.explanation).toBe(`${"B".repeat(997)}...`);
           expect(patched.explanation?.length).toBe(1000);
         });
       });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
