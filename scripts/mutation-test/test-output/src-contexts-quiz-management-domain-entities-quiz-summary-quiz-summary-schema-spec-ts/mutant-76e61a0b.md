# Mutant 76e61a0b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4966
**Stable ID**: 76e61a0b
**Location**: L40:69–L47:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4966
@@ -36,16 +36,9 @@
         ["null value", null, false],
         ["undefined value", undefined, false],
         ["number", 123, false],
         ["object", {}, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = QuizId.safeParse(input);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success) {
-          expect(result.data).toBe(input);
-        }
-      });
+      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {});
     });
 
     describe("SolutionId", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
