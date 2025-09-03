# Mutant 96d3f2f7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5630
**Stable ID**: 96d3f2f7
**Location**: L258:61–L258:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5630
@@ -254,9 +254,9 @@
     it("should create from draft", () => {
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
