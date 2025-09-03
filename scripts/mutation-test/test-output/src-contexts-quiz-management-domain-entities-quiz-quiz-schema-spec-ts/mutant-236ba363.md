# Mutant 236ba363 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3090
**Stable ID**: 236ba363
**Location**: L265:14–L265:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3090
@@ -261,9 +261,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Strict Mode", () => {
+    describe("", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validQuizData,
           extraField: "not allowed",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
