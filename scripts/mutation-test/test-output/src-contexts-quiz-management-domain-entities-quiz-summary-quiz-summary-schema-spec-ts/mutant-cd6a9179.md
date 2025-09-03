# Mutant cd6a9179 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4970
**Stable ID**: cd6a9179
**Location**: L44:40–L46:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4970
@@ -40,11 +40,9 @@
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
-          expect(result.data).toBe(input);
-        }
+        if (isValid && result.success) {}
       });
     });
 
     describe("SolutionId", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
