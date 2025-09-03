# Mutant 15aaaf4c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7383
**Stable ID**: 15aaaf4c
**Location**: L617:27–L621:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7383
@@ -613,12 +613,8 @@
 
       const result = TagSchema.safeParse(unicodeTag);
       expect(result.success).toBe(true);
 
-      if (result.success) {
-        expect(result.data.name).toContain("C++");
-        expect(result.data.name).toContain("プログラミング");
-        expect(result.data.name).toContain("🚀");
-      }
+      if (result.success) {}
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
