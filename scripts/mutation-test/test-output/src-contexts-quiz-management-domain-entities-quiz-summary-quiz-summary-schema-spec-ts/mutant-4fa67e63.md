# Mutant 4fa67e63 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5380
**Stable ID**: 4fa67e63
**Location**: L407:8–L407:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5380
@@ -403,9 +403,9 @@
         expect(result.data.approvedAt).toBeDefined();
       }
     });
 
-    it("should handle minimal valid quiz", () => {
+    it("", () => {
       const minimalQuiz = {
         id: "q",
         question: "Q?",
         answerType: "boolean" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
