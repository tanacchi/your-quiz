# Mutant d7a8187c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3118
**Stable ID**: d7a8187c
**Location**: L310:10–L310:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3118
@@ -306,9 +306,9 @@
           );
         }
       });
 
-      it("should accept non-approved status without approvedAt", () => {
+      it("", () => {
         const pendingData = {
           ...validQuizData,
           status: "pending_approval" as const,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
