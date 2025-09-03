# Mutant 491af52e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6858
**Stable ID**: 491af52e
**Location**: L44:13–L44:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6858
@@ -40,9 +40,9 @@
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
+        if (false) {
           expect(result.data).toBe(input);
         }
       });
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
