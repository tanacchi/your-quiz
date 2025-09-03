# Mutant 9d8b3211 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7183
**Stable ID**: 9d8b3211
**Location**: L343:21–L343:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7183
@@ -339,9 +339,9 @@
             },
             {
               relationType: "related" as const,
               id: "tag-1", // another duplicate
-              name: "Related 1",
+              name: "",
             },
           ],
         };
         const result = TagSchema.safeParse(dataWithMultipleDuplicates);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
