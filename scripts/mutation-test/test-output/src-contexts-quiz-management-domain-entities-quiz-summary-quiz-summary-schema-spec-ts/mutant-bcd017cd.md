# Mutant bcd017cd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5229
**Stable ID**: bcd017cd
**Location**: L222:36–L225:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5229
@@ -218,12 +218,9 @@
     });
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validQuizSummaryData,
-          extraField: "not allowed",
-        };
+        const dataWithExtraField = {};
         const result = QuizSummarySchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
