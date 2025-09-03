# Mutant d49806c0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: MethodExpression
**Original ID**: 6247
**Stable ID**: d49806c0
**Location**: L184:11–L186:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6247
@@ -180,11 +180,9 @@
 
       if (result.isErr()) {
         const { issues } = result.error;
         expect(
-          issues.some((issue) =>
-            issue.message.includes("cannot reference itself"),
-          ),
+          issues.every(issue => issue.message.includes("cannot reference itself")),
         ).toBe(true);
       }
     });
   });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
