# Mutant 67fc866d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5228
**Stable ID**: 67fc866d
**Location**: L221:56–L228:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5228
@@ -217,16 +217,9 @@
       });
     });
 
     describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validQuizSummaryData,
-          extraField: "not allowed",
-        };
-        const result = QuizSummarySchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
+      it("should reject data with extra fields", () => {});
     });
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
