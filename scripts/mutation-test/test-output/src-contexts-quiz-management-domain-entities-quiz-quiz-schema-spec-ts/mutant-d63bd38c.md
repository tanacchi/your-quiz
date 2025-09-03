# Mutant d63bd38c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3094
**Stable ID**: d63bd38c
**Location**: L267:36–L270:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3094
@@ -263,12 +263,9 @@
     });
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validQuizData,
-          extraField: "not allowed",
-        };
+        const dataWithExtraField = {};
         const result = QuizSchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
