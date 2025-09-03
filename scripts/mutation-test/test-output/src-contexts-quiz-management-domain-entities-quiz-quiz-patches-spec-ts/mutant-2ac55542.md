# Mutant 2ac55542 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 1726
**Stable ID**: 2ac55542
**Location**: L87:18–L87:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1726
@@ -83,9 +83,9 @@
           expect(patches.length).toBeGreaterThanOrEqual(1);
           const patched = applyEntityPatch(input, patches.at(0) ?? {});
 
           expect(patched.question).toBe(`${"A".repeat(497)}...`);
-          expect(patched.question?.length).toBe(500);
+          expect(patched.question.length).toBe(500);
         });
       });
     });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
