# Mutant 17a80cee Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3138
**Stable ID**: 17a80cee
**Location**: L340:52–L340:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3138
@@ -336,9 +336,9 @@
           const solutionError = error.issues.find((issue) =>
             issue.path.includes("solution"),
           );
           expect(solutionError).toBeDefined();
-          expect(solutionError?.message).toContain("expected object");
+          expect(solutionError?.message).toContain("");
         }
       });
 
       it("should reject boolean answerType with null solution", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
