# Mutant 5afe35d6 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7557
**Stable ID**: 5afe35d6
**Location**: L174:13–L174:32

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7557
@@ -170,9 +170,9 @@
         };
         const parseResult = zodQuizRowSchema.safeParse(rowWithNumericId);
 
         expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
+        if (false) {
           expect(parseResult.data.id).toBe("123");
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
