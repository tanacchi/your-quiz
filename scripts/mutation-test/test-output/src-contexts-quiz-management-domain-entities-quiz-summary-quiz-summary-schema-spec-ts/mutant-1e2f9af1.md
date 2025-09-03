# Mutant 1e2f9af1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5316
**Stable ID**: 1e2f9af1
**Location**: L355:10–L355:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5316
@@ -351,9 +351,9 @@
     });
 
     describe("Special Characters", () => {
       it.each([
-        ["special characters", "What is <script>alert('xss')</script>?"],
+        ["", "What is <script>alert('xss')</script>?"],
         ["emoji", "What is TypeScript? 🤔"],
         ["multiline", "Line 1\nLine 2\nLine 3"],
         ["unicode", "TypeScriptとは何ですか？"],
         ["html entities", "&lt;html&gt; tags"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
