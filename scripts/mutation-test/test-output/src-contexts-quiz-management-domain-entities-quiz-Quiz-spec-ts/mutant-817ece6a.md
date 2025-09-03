# Mutant 817ece6a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1574
**Stable ID**: 817ece6a
**Location**: L855:13–L855:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1574
@@ -851,9 +851,9 @@
           (patch) =>
             typeof patch === "object" && patch !== null && "status" in patch,
         );
         expect(statusPatch).toBeDefined();
-        if (statusPatch && "status" in statusPatch) {
+        if (false) {
           expect(statusPatch.status).toBe("pending_approval");
         }
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
