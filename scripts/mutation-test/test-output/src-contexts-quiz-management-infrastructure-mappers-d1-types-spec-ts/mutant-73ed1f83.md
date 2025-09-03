# Mutant 73ed1f83 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7636
**Stable ID**: 73ed1f83
**Location**: L298:43–L302:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7636
@@ -294,13 +294,9 @@
           "orderIndex",
           "isCorrect",
         ];
 
-        requiredFields.forEach((field) => {
-          const invalidChoice = { ...createValidParsedChoice() };
-          delete (invalidChoice as Record<string, unknown>)[field];
-          expectInvalidParse(zodParsedChoiceSchema, invalidChoice);
-        });
+        requiredFields.forEach((field) => {});
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
