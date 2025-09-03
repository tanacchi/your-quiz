# Mutant ceb91390 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7386
**Stable ID**: ceb91390
**Location**: L620:44–L620:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7386
@@ -616,9 +616,9 @@
 
       if (result.success) {
         expect(result.data.name).toContain("C++");
         expect(result.data.name).toContain("プログラミング");
-        expect(result.data.name).toContain("🚀");
+        expect(result.data.name).toContain("");
       }
     });
   });
 });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
