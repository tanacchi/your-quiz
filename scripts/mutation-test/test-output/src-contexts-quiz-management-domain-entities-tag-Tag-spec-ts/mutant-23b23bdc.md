# Mutant 23b23bdc Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: MethodExpression
**Original ID**: 6232
**Stable ID**: 23b23bdc
**Location**: L159:11–L161:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6232
@@ -155,11 +155,9 @@
 
       if (result.isErr()) {
         const { issues } = result.error;
         expect(
-          issues.some((issue) =>
-            issue.message.includes("Duplicate related tag IDs"),
-          ),
+          issues.every(issue => issue.message.includes("Duplicate related tag IDs")),
         ).toBe(true);
       }
     });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
