# Mutant f9caea13 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5282
**Stable ID**: f9caea13
**Location**: L304:30–L313:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5282
@@ -300,18 +300,9 @@
         };
         const result = QuizSummarySchema.safeParse(dataWithDuplicateTagIds);
         expect(result.success).toBe(false);
 
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
+        if (!result.success) {}
       });
 
       it("should accept empty tag IDs array", () => {
         const dataWithEmptyTagIds = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
