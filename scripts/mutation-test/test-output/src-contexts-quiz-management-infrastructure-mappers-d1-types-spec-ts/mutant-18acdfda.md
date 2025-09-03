# Mutant 18acdfda Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7583
**Stable ID**: 18acdfda
**Location**: L219:43–L224:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7583
@@ -215,14 +215,9 @@
           "creator_id",
           "created_at",
         ];
 
-        requiredFields.forEach((field) => {
-          const baseRow = createValidQuizRow();
-          const invalidRow = { ...baseRow };
-          delete (invalidRow as Record<string, unknown>)[field];
-          expectInvalidParse(zodQuizRowSchema, invalidRow);
-        });
+        requiredFields.forEach((field) => {});
       });
     });
 
     describe("Count Result Schema", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
