# Mutant bed899cc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 939
**Stable ID**: bed899cc
**Location**: L42:10–L42:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #939
@@ -38,9 +38,9 @@
         ["valid with numbers", "creator123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      ])("", (_desc, input, isValid) => {
         const result = CreatorId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
