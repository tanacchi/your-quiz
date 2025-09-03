# Mutant 9e948dab Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7278
**Stable ID**: 9e948dab
**Location**: L493:47–L493:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7278
@@ -489,9 +489,9 @@
         expect(result.success).toBe(true);
       });
 
       it("should reject 51 character name", () => {
-        const data = { ...validTagData, name: "A".repeat(51) };
+        const data = { ...validTagData, name: "".repeat(51) };
         const result = TagSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
