# Mutant 9dff9f36 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1043
**Stable ID**: 9dff9f36
**Location**: L177:14–L177:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1043
@@ -173,9 +173,9 @@
         expect(rejectionResult.isErr()).toBe(true);
       });
     });
 
-    describe("Permission Checks", () => {
+    describe("", () => {
       it("should allow updates for pending approval quiz", () => {
         expect(quiz.canBeUpdated()).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
