# Mutant 12e66e25 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5661
**Stable ID**: 12e66e25
**Location**: L303:61–L303:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5661
@@ -299,9 +299,9 @@
       const draft = new BooleanSolution.Draft();
       draft.with(validSolutionData as Record<string, unknown>);
 
       const result = BooleanSolution.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
+      const entity = result._unsafeUnwrap({ withStackTrace: false });
       expect(entity).toBeDefined();
     });
   });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
