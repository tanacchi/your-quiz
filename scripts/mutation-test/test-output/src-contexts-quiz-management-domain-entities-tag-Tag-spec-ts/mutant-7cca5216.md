# Mutant 7cca5216 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 6189
**Stable ID**: 7cca5216
**Location**: L89:16–L89:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6189
@@ -85,9 +85,9 @@
         const tag = result.value;
         const relations = tag.get("relatedTags");
         expect(relations).toHaveLength(1);
         expect(relations[0]?.relationType).toBe("hierarchy");
-        expect(relations[0]?.name).toBe("Programming");
+        expect(relations[0].name).toBe("Programming");
       }
     });
 
     it("should suggest patches for invalid data", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
