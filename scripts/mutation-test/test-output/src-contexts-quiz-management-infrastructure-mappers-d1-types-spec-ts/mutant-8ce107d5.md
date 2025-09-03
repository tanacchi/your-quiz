# Mutant 8ce107d5 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7530
**Stable ID**: 8ce107d5
**Location**: L133:34–L133:43

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7530
@@ -129,9 +129,9 @@
         });
       });
 
       test("should reject invalid quiz statuses", () => {
-        const invalidStatuses = ["invalid", "", null, undefined];
+        const invalidStatuses = ["", "", null, undefined];
 
         invalidStatuses.forEach((status) => {
           expectInvalidParse(zodQuizStatusSchema, status);
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
