# Mutant 1ca62bce Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5148
**Stable ID**: 1ca62bce
**Location**: L160:14–L160:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5148
@@ -156,9 +156,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("AnswerType Field", () => {
+    describe("", () => {
       it.each([
         ["boolean", "boolean", true],
         ["free_text", "free_text", true],
         ["single_choice", "single_choice", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
