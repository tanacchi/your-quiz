# Mutant 98c7d6ae Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 7211
**Stable ID**: 98c7d6ae
**Location**: L390:18–L390:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7211
@@ -386,9 +386,9 @@
           const selfRefError = error.issues.find((issue) =>
             issue.path.includes("relatedTags"),
           );
           expect(selfRefError).toBeDefined();
-          expect(selfRefError?.message).toBe(
+          expect(selfRefError.message).toBe(
             "Tag cannot reference itself in related tags",
           );
         }
       });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
