# Mutant af920251 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5629
**Stable ID**: af920251
**Location**: L258:43–L258:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5629
@@ -254,9 +254,9 @@
     it("should create from draft", () => {
       const draft = new BooleanSolution.Draft();
       draft.with(validSolutionData as Record<string, unknown>);
       const result = BooleanSolution.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
+      const entity = result._unsafeUnwrap({});
       expect(entity).toBeDefined();
     });
   });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
