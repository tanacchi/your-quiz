# Mutant f51929bc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1465
**Stable ID**: f51929bc
**Location**: L749:12–L749:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1465
@@ -745,9 +745,9 @@
           const issuesAfterPatches = draft.getIssues();
           expect(Array.isArray(issuesAfterPatches)).toBe(true);
         });
 
-        it("should work with object patches", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-object-patch",
             question: "Object patch test?",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
