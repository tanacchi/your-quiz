# Mutant a041d976 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5115
**Stable ID**: a041d976
**Location**: L144:14–L144:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5115
@@ -140,9 +140,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Question Field", () => {
+    describe("", () => {
       it.each([
         ["valid question", "What is TypeScript?", true],
         ["single character", "A", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
