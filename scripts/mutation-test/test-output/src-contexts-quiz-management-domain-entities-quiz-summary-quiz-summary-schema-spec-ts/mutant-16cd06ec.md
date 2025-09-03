# Mutant 16cd06ec Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5262
**Stable ID**: 16cd06ec
**Location**: L286:51–L333:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5262
@@ -282,56 +282,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Duplicate TagIds Validation", () => {
-      it("should accept unique tag IDs", () => {
-        const dataWithUniqueTagIds = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1", "tag-2", "tag-3"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithUniqueTagIds);
-        expect(result.success).toBe(true);
-      });
-
-      it("should reject duplicate tag IDs", () => {
-        const dataWithDuplicateTagIds = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1", "tag-2", "tag-1"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithDuplicateTagIds);
-        expect(result.success).toBe(false);
-
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
-      it("should accept empty tag IDs array", () => {
-        const dataWithEmptyTagIds = {
-          ...validQuizSummaryData,
-          tagIds: [],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithEmptyTagIds);
-        expect(result.success).toBe(true);
-      });
-
-      it("should accept single tag ID", () => {
-        const dataWithSingleTagId = {
-          ...validQuizSummaryData,
-          tagIds: ["tag-1"],
-        };
-        const result = QuizSummarySchema.safeParse(dataWithSingleTagId);
-        expect(result.success).toBe(true);
-      });
-    });
+    describe("Duplicate TagIds Validation", () => {});
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("Long Strings", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
