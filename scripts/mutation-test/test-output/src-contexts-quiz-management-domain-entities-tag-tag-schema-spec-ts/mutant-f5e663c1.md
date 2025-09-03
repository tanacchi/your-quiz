# Mutant f5e663c1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7385
**Stable ID**: f5e663c1
**Location**: L619:44–L619:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7385
@@ -615,9 +615,9 @@
       expect(result.success).toBe(true);
 
       if (result.success) {
         expect(result.data.name).toContain("C++");
-        expect(result.data.name).toContain("プログラミング");
+        expect(result.data.name).toContain("");
         expect(result.data.name).toContain("🚀");
       }
     });
   });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
