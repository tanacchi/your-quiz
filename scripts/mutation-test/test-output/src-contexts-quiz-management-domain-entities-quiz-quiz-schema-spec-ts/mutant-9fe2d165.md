# Mutant 9fe2d165 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2867
**Stable ID**: 9fe2d165
**Location**: L83:79–L86:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2867
@@ -79,12 +79,9 @@
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
         ["creatorId", { ...validQuizData, creatorId: undefined }],
         ["createdAt", { ...validQuizData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = QuizSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
+      ])("should reject missing required field: %s", (_field, invalidData) => {});
     });
 
     describe("Question Field", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
