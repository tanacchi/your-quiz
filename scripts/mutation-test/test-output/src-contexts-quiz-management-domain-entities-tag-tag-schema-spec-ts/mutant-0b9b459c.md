# Mutant 0b9b459c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7226
**Stable ID**: 0b9b459c
**Location**: L414:21–L414:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7226
@@ -410,9 +410,9 @@
             },
             {
               relationType: "related" as const,
               id: "tag-self", // another self-reference
-              name: "Self Tag 2",
+              name: "",
             },
           ],
         };
         const result = TagSchema.safeParse(dataWithMultipleSelfReferences);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
