# Mutant 6f84f9ee Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 647
**Stable ID**: 6f84f9ee
**Location**: L467:18–L467:35

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #647
@@ -463,9 +463,9 @@
           const statusError = error.issues.find((issue) =>
             issue.path.includes("status"),
           );
           expect(statusError).toBeDefined();
-          expect(statusError?.code).toBe("invalid_value");
+          expect(statusError.code).toBe("invalid_value");
         }
       });
 
       it("should provide specific error paths for invalid limit", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
