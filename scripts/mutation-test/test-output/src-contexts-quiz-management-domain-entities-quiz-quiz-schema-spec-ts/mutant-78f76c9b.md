# Mutant 78f76c9b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3113
**Stable ID**: 78f76c9b
**Location**: L298:30–L307:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3113
@@ -294,18 +294,9 @@
         };
         const result = QuizSchema.safeParse(approvedWithoutTimestamp);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const approvedAtError = error.issues.find((issue) =>
-            issue.path.includes("approvedAt"),
-          );
-          expect(approvedAtError).toBeDefined();
-          expect(approvedAtError?.message).toBe(
-            "Approved quiz must have approvedAt timestamp",
-          );
-        }
+        if (!result.success) {}
       });
 
       it("should accept non-approved status without approvedAt", () => {
         const pendingData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
