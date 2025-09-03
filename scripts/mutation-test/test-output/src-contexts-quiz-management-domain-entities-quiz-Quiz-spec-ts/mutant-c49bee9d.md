# Mutant c49bee9d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1046
**Stable ID**: c49bee9d
**Location**: L178:66–L180:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1046
@@ -174,11 +174,9 @@
       });
     });
 
     describe("Permission Checks", () => {
-      it("should allow updates for pending approval quiz", () => {
-        expect(quiz.canBeUpdated()).toBe(true);
-      });
+      it("should allow updates for pending approval quiz", () => {});
 
       it("should prevent updates for approved quiz", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
