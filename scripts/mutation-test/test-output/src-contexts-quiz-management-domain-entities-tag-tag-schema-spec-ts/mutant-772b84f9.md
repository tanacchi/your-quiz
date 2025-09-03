# Mutant 772b84f9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 7169
**Stable ID**: 772b84f9
**Location**: L320:18–L320:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7169
@@ -316,9 +316,9 @@
           const duplicateError = error.issues.find((issue) =>
             issue.path.includes("relatedTags"),
           );
           expect(duplicateError).toBeDefined();
-          expect(duplicateError?.message).toBe(
+          expect(duplicateError.message).toBe(
             "Duplicate related tag IDs are not allowed",
           );
         }
       });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
