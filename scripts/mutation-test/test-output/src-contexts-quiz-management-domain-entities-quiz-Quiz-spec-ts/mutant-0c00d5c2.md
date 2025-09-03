# Mutant 0c00d5c2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1007
**Stable ID**: 0c00d5c2
**Location**: L131:49–L140:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1007
@@ -127,19 +127,10 @@
       quiz = result._unsafeUnwrap();
     });
 
     describe("Approval Workflow", () => {
-      it("should approve quiz correctly", () => {
-        const approvedResult = quiz.approve("2023-12-02 10:00:00");
-        expect(approvedResult.isOk()).toBe(true);
+      it("should approve quiz correctly", () => {});
 
-        if (approvedResult.isOk()) {
-          const approvedQuiz = approvedResult.value;
-          expect(approvedQuiz.get("status")).toBe("approved");
-          expect(approvedQuiz.get("approvedAt")).toBe("2023-12-02 10:00:00");
-        }
-      });
-
       it("should prevent approval of non-pending quiz", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
