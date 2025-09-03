# Mutant 7ce7caac Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 659
**Stable ID**: 7ce7caac
**Location**: L482:18–L482:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #659
@@ -478,9 +478,9 @@
           const limitError = error.issues.find((issue) =>
             issue.path.includes("limit"),
           );
           expect(limitError).toBeDefined();
-          expect(limitError?.code).toBe("too_small");
+          expect(limitError.code).toBe("too_small");
         }
       });
 
       it("should provide specific error paths for invalid offset", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
