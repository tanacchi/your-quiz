# Mutant 2144fe15 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 3137
**Stable ID**: 2144fe15
**Location**: L340:18–L340:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3137
@@ -336,9 +336,9 @@
           const solutionError = error.issues.find((issue) =>
             issue.path.includes("solution"),
           );
           expect(solutionError).toBeDefined();
-          expect(solutionError?.message).toContain("expected object");
+          expect(solutionError.message).toContain("expected object");
         }
       });
 
       it("should reject boolean answerType with null solution", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
