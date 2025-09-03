# Mutant 6f23aaa9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 4969
**Stable ID**: 6f23aaa9
**Location**: L44:13–L44:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4969
@@ -40,9 +40,9 @@
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
+        if (isValid || result.success) {
           expect(result.data).toBe(input);
         }
       });
     });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
