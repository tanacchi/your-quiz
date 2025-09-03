# Mutant 4a0e08c3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6283
**Stable ID**: 4a0e08c3
**Location**: L234:56–L234:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6283
@@ -230,9 +230,9 @@
     it("should check relation existence", () => {
       expect(tag.hasRelationWith(TagId.parse("tag-2"))).toBe(true);
       expect(tag.hasRelationWith(TagId.parse("tag-2"), "hierarchy")).toBe(true);
       expect(tag.hasRelationWith(TagId.parse("tag-2"), "category")).toBe(false);
-      expect(tag.hasRelationWith(TagId.parse("tag-3"), "category")).toBe(true);
+      expect(tag.hasRelationWith(TagId.parse("tag-3"), "")).toBe(true);
       expect(tag.hasRelationWith(TagId.parse("tag-999"))).toBe(false);
     });
   });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
