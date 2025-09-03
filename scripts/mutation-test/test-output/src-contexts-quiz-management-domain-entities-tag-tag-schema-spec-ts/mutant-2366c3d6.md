# Mutant 2366c3d6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7384
**Stable ID**: 2366c3d6
**Location**: L618:44–L618:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7384
@@ -614,9 +614,9 @@
       const result = TagSchema.safeParse(unicodeTag);
       expect(result.success).toBe(true);
 
       if (result.success) {
-        expect(result.data.name).toContain("C++");
+        expect(result.data.name).toContain("");
         expect(result.data.name).toContain("プログラミング");
         expect(result.data.name).toContain("🚀");
       }
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
