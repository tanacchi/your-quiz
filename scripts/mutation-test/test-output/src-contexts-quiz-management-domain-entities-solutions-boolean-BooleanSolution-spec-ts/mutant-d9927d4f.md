# Mutant d9927d4f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5660
**Stable ID**: d9927d4f
**Location**: L303:43–L303:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5660
@@ -299,9 +299,9 @@
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
