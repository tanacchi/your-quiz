# Mutant f64341ed Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 34
**Stable ID**: f64341ed
**Location**: L28:3–L28:21

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #34
@@ -24,9 +24,9 @@
   "multiple_choice",
 ]);
 
 export const zodQuizStatusSchema = z.enum([
-  "pending_approval",
+  "",
   "approved",
   "rejected",
 ]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。