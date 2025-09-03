# Mutant 86280cb3 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7514
**Stable ID**: 86280cb3
**Location**: L115:30–L115:62

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7514
@@ -111,9 +111,9 @@
         });
       });
 
       test("should reject invalid answer types", () => {
-        const invalidTypes = ["invalid", "", null, undefined];
+        const invalidTypes = [];
 
         invalidTypes.forEach((type) => {
           expectInvalidParse(zodAnswerTypeSchema, type);
         });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
