# Mutant d0923d16 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3092
**Stable ID**: d0923d16
**Location**: L266:10–L266:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3092
@@ -262,9 +262,9 @@
       });
     });
 
     describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
+      it("", () => {
         const dataWithExtraField = {
           ...validQuizData,
           extraField: "not allowed",
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
