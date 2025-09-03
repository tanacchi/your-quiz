# Mutant e1237cd7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7515
**Stable ID**: e1237cd7
**Location**: L115:31–L115:40

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7515
@@ -111,9 +111,9 @@
         });
       });
 
       test("should reject invalid answer types", () => {
-        const invalidTypes = ["invalid", "", null, undefined];
+        const invalidTypes = ["", "", null, undefined];
 
         invalidTypes.forEach((type) => {
           expectInvalidParse(zodAnswerTypeSchema, type);
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
