# Mutant c6f8f3f4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3093
**Stable ID**: c6f8f3f4
**Location**: L266:56–L273:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3093
@@ -262,16 +262,9 @@
       });
     });
 
     describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validQuizData,
-          extraField: "not allowed",
-        };
-        const result = QuizSchema.safeParse(dataWithExtraField);
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
