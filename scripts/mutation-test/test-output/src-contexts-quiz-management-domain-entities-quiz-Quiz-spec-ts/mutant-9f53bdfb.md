# Mutant 9f53bdfb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1573
**Stable ID**: 9f53bdfb
**Location**: L855:13–L855:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1573
@@ -851,9 +851,9 @@
           (patch) =>
             typeof patch === "object" && patch !== null && "status" in patch,
         );
         expect(statusPatch).toBeDefined();
-        if (statusPatch && "status" in statusPatch) {
+        if (true) {
           expect(statusPatch.status).toBe("pending_approval");
         }
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
