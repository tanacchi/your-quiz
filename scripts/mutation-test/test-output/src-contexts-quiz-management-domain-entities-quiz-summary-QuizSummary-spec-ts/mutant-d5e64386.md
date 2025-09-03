# Mutant d5e64386 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3362
**Stable ID**: d5e64386
**Location**: L56:61–L64:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3362
@@ -52,17 +52,9 @@
         ["empty string", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = TagId.safeParse(input);
-
-        expect(result.success).toBe(isValid);
-        if (isValid && result.success) {
-          expect(result.data).toBeDefined();
-          expect(result.data).toBe(input);
-        }
-      });
+      ])("should handle %s: %s", (_desc, input, isValid) => {});
     });
   });
 
   describe("Schema Validation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
