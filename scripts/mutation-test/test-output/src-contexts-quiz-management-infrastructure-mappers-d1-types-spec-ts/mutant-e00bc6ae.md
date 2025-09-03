# Mutant e00bc6ae Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7584
**Stable ID**: e00bc6ae
**Location**: L221:30–L221:44

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7584
@@ -217,9 +217,9 @@
         ];
 
         requiredFields.forEach((field) => {
           const baseRow = createValidQuizRow();
-          const invalidRow = { ...baseRow };
+          const invalidRow = {};
           delete (invalidRow as Record<string, unknown>)[field];
           expectInvalidParse(zodQuizRowSchema, invalidRow);
         });
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
