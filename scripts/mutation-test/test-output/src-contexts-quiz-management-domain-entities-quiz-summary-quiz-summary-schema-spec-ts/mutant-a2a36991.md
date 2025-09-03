# Mutant a2a36991 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5313
**Stable ID**: a2a36991
**Location**: L353:42–L365:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5313
@@ -349,21 +349,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Special Characters", () => {
-      it.each([
-        ["special characters", "What is <script>alert('xss')</script>?"],
-        ["emoji", "What is TypeScript? 🤔"],
-        ["multiline", "Line 1\nLine 2\nLine 3"],
-        ["unicode", "TypeScriptとは何ですか？"],
-        ["html entities", "&lt;html&gt; tags"],
-      ])("should accept question with %s", (_desc, question) => {
-        const data = { ...validQuizSummaryData, question };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-    });
+    describe("Special Characters", () => {});
 
     describe("Date Validation", () => {
       it.each([
         ["SQLite format", "2023-12-01 10:00:00", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
