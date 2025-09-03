# Mutant d43566ea Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7182
**Stable ID**: d43566ea
**Location**: L342:19–L342:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7182
@@ -338,9 +338,9 @@
               name: "Synonym 1",
             },
             {
               relationType: "related" as const,
-              id: "tag-1", // another duplicate
+              id: "", // another duplicate
               name: "Related 1",
             },
           ],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
