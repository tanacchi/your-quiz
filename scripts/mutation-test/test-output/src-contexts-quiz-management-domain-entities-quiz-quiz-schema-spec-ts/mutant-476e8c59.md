# Mutant 476e8c59 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 3116
**Stable ID**: 476e8c59
**Location**: L304:18–L304:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3116
@@ -300,9 +300,9 @@
           const approvedAtError = error.issues.find((issue) =>
             issue.path.includes("approvedAt"),
           );
           expect(approvedAtError).toBeDefined();
-          expect(approvedAtError?.message).toBe(
+          expect(approvedAtError.message).toBe(
             "Approved quiz must have approvedAt timestamp",
           );
         }
       });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
