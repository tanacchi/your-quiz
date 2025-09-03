# Mutant d11ed632 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7324
**Stable ID**: d11ed632
**Location**: L531:29–L533:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7324
@@ -527,11 +527,9 @@
         };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.relatedTags).toHaveLength(20);
-        }
+        if (result.success) {}
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
