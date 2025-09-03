# Mutant 14a77b6c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3084
**Stable ID**: 14a77b6c
**Location**: L250:29–L252:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3084
@@ -246,11 +246,9 @@
       it("should accept quiz without approvedAt", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.approvedAt).toBeUndefined();
-        }
+        if (result.success) {}
       });
 
       it("should accept valid approvedAt", () => {
         const dataWithApprovedAt = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
