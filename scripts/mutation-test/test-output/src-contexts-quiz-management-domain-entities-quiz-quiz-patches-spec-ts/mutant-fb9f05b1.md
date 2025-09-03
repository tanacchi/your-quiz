# Mutant fb9f05b1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 1769
**Stable ID**: fb9f05b1
**Location**: L121:18–L121:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1769
@@ -117,9 +117,9 @@
           const patches = suggestExplanationPatches(input.explanation);
           const patched = applyEntityPatch(input, patches.at(0) ?? {});
 
           expect(patched.explanation).toBe(`${"A".repeat(997)}...`);
-          expect(patched.explanation?.length).toBe(1000);
+          expect(patched.explanation.length).toBe(1000);
         });
       });
     });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
