# Mutant 6d480b35 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3091
**Stable ID**: 6d480b35
**Location**: L265:35–L274:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3091
@@ -261,18 +261,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validQuizData,
-          extraField: "not allowed",
-        };
-        const result = QuizSchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
-    });
+    describe("Strict Mode", () => {});
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Approved Status and ApprovedAt", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
