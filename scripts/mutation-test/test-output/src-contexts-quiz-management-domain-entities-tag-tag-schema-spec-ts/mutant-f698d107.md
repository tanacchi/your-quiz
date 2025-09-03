# Mutant f698d107 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7225
**Stable ID**: f698d107
**Location**: L413:19–L413:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7225
@@ -409,9 +409,9 @@
               name: "Other Tag",
             },
             {
               relationType: "related" as const,
-              id: "tag-self", // another self-reference
+              id: "", // another self-reference
               name: "Self Tag 2",
             },
           ],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
