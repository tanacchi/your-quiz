# Mutant 953dcb67 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1004
**Stable ID**: 953dcb67
**Location**: L130:14–L130:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1004
@@ -126,9 +126,9 @@
       expect(result.isOk()).toBe(true);
       quiz = result._unsafeUnwrap();
     });
 
-    describe("Approval Workflow", () => {
+    describe("", () => {
       it("should approve quiz correctly", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
