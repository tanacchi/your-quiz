# Mutant 4481a38d Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 672
**Stable ID**: 4481a38d
**Location**: L497:18–L497:35

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #672
@@ -493,9 +493,9 @@
           const offsetError = error.issues.find((issue) =>
             issue.path.includes("offset"),
           );
           expect(offsetError).toBeDefined();
-          expect(offsetError?.code).toBe("too_small");
+          expect(offsetError.code).toBe("too_small");
         }
       });
 
       it("should provide errors for empty strings", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
