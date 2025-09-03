# Mutant 18aef78b Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7637
**Stable ID**: 18aef78b
**Location**: L299:33–L299:65

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7637
@@ -295,9 +295,9 @@
           "isCorrect",
         ];
 
         requiredFields.forEach((field) => {
-          const invalidChoice = { ...createValidParsedChoice() };
+          const invalidChoice = {};
           delete (invalidChoice as Record<string, unknown>)[field];
           expectInvalidParse(zodParsedChoiceSchema, invalidChoice);
         });
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
