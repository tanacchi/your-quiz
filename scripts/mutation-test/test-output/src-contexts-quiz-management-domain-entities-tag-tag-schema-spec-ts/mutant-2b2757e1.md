# Mutant 2b2757e1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7277
**Stable ID**: 2b2757e1
**Location**: L493:22–L493:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7277
@@ -489,9 +489,9 @@
         expect(result.success).toBe(true);
       });
 
       it("should reject 51 character name", () => {
-        const data = { ...validTagData, name: "A".repeat(51) };
+        const data = {};
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
