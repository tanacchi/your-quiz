# Mutant f54971fb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3883
**Stable ID**: f54971fb
**Location**: L615:65–L615:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3883
@@ -611,9 +611,9 @@
         } as Parameters<typeof draft.with>[0]);
 
         const result = draft.commit();
 
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
+        const error = result._unsafeUnwrapErr({ withStackTrace: false });
         expect(error).toBeDefined();
         expect(error.issues.length).toBeGreaterThan(0);
       });
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
