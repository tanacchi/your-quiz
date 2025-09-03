# Mutant 69ca1c9e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5312
**Stable ID**: 69ca1c9e
**Location**: L353:14–L353:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5312
@@ -349,9 +349,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Special Characters", () => {
+    describe("", () => {
       it.each([
         ["special characters", "What is <script>alert('xss')</script>?"],
         ["emoji", "What is TypeScript? 🤔"],
         ["multiline", "Line 1\nLine 2\nLine 3"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
