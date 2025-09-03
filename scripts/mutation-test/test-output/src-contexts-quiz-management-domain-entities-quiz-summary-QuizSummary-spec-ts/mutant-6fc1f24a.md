# Mutant 6fc1f24a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3319
**Stable ID**: 6fc1f24a
**Location**: L34:61–L42:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3319
@@ -30,17 +30,9 @@
         ["empty string", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = QuizId.safeParse(input);
-
-        expect(result.success).toBe(isValid);
-        if (isValid && result.success) {
-          expect(result.data).toBeDefined();
-          expect(result.data).toBe(input);
-        }
-      });
+      ])("should handle %s: %s", (_desc, input, isValid) => {});
     });
 
     describe("TagId validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
