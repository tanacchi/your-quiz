# Mutant 6b25f4c0 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7556
**Stable ID**: 6b25f4c0
**Location**: L174:13–L174:32

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7556
@@ -170,9 +170,9 @@
         };
         const parseResult = zodQuizRowSchema.safeParse(rowWithNumericId);
 
         expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
+        if (true) {
           expect(parseResult.data.id).toBe("123");
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
