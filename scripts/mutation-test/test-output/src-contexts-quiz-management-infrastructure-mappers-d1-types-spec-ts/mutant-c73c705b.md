# Mutant c73c705b Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7516
**Stable ID**: c73c705b
**Location**: L115:42–L115:44

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7516
@@ -111,9 +111,9 @@
         });
       });
 
       test("should reject invalid answer types", () => {
-        const invalidTypes = ["invalid", "", null, undefined];
+        const invalidTypes = ["invalid", "Stryker was here!", null, undefined];
 
         invalidTypes.forEach((type) => {
           expectInvalidParse(zodAnswerTypeSchema, type);
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
