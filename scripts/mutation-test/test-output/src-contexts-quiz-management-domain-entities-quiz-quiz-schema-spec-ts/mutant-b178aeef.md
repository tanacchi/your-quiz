# Mutant b178aeef Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3134
**Stable ID**: b178aeef
**Location**: L334:30–L341:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3134
@@ -330,16 +330,9 @@
         };
         const result = QuizSchema.safeParse(dataWithoutSolution);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const solutionError = error.issues.find((issue) =>
-            issue.path.includes("solution"),
-          );
-          expect(solutionError).toBeDefined();
-          expect(solutionError?.message).toContain("expected object");
-        }
+        if (!result.success) {}
       });
 
       it("should reject boolean answerType with null solution", () => {
         const dataWithNullSolution = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
