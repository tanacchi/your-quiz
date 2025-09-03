# Mutant b1d863d9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1576
**Stable ID**: b1d863d9
**Location**: L855:28–L855:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1576
@@ -851,9 +851,9 @@
           (patch) =>
             typeof patch === "object" && patch !== null && "status" in patch,
         );
         expect(statusPatch).toBeDefined();
-        if (statusPatch && "status" in statusPatch) {
+        if (statusPatch && "" in statusPatch) {
           expect(statusPatch.status).toBe("pending_approval");
         }
       }
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
