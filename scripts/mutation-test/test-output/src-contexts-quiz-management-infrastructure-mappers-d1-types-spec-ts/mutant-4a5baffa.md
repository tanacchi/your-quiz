# Mutant 4a5baffa Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7529
**Stable ID**: 4a5baffa
**Location**: L133:33–L133:65

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7529
@@ -129,9 +129,9 @@
         });
       });
 
       test("should reject invalid quiz statuses", () => {
-        const invalidStatuses = ["invalid", "", null, undefined];
+        const invalidStatuses = [];
 
         invalidStatuses.forEach((status) => {
           expectInvalidParse(zodQuizStatusSchema, status);
         });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
