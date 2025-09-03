# Mutant fe5b714d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3080
**Stable ID**: fe5b714d
**Location**: L246:57–L253:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3080
@@ -242,17 +242,10 @@
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
 
-      it("should accept quiz without approvedAt", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
+      it("should accept quiz without approvedAt", () => {});
 
-        if (result.success) {
-          expect(result.data.approvedAt).toBeUndefined();
-        }
-      });
-
       it("should accept valid approvedAt", () => {
         const dataWithApprovedAt = {
           ...validQuizData,
           approvedAt: "2023-12-02 15:00:00",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
