# Mutant 262aaf4e Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 6187
**Stable ID**: 262aaf4e
**Location**: L88:16–L88:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6187
@@ -84,9 +84,9 @@
       if (result.isOk()) {
         const tag = result.value;
         const relations = tag.get("relatedTags");
         expect(relations).toHaveLength(1);
-        expect(relations[0]?.relationType).toBe("hierarchy");
+        expect(relations[0].relationType).toBe("hierarchy");
         expect(relations[0]?.name).toBe("Programming");
       }
     });
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
