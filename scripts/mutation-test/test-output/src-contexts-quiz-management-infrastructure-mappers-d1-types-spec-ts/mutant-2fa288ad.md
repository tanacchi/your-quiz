# Mutant 2fa288ad Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7531
**Stable ID**: 2fa288ad
**Location**: L133:45–L133:47

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7531
@@ -129,9 +129,9 @@
         });
       });
 
       test("should reject invalid quiz statuses", () => {
-        const invalidStatuses = ["invalid", "", null, undefined];
+        const invalidStatuses = ["invalid", "Stryker was here!", null, undefined];
 
         invalidStatuses.forEach((status) => {
           expectInvalidParse(zodQuizStatusSchema, status);
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
