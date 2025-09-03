# Mutant 98016a0a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5272
**Stable ID**: 98016a0a
**Location**: L296:51–L314:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5272
@@ -292,28 +292,10 @@
         const result = QuizSummarySchema.safeParse(dataWithUniqueTagIds);
         expect(result.success).toBe(true);
       });
 
-      it("should reject duplicate tag IDs", () => {
-        const dataWithDuplicateTagIds = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1", "tag-2", "tag-1"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithDuplicateTagIds);
-        expect(result.success).toBe(false);
+      it("should reject duplicate tag IDs", () => {});
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const duplicateError = error.issues.find((issue) =>
-            issue.path.includes("tagIds"),
-          );
-          expect(duplicateError).toBeDefined();
-          expect(duplicateError?.message).toBe(
-            "Duplicate tag IDs are not allowed",
-          );
-        }
-      });
-
       it("should accept empty tag IDs array", () => {
         const dataWithEmptyTagIds = {
           ...validQuizSummaryData,
           tagIds: [],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
