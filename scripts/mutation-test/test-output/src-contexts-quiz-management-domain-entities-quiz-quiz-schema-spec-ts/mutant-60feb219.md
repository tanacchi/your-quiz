# Mutant 60feb219 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3193
**Stable ID**: 60feb219
**Location**: L401:47–L401:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3193
@@ -397,9 +397,9 @@
 
     describe("Complex Boolean Solutions", () => {
       it.each([
         ["true value", { id: "sol-1", value: true }],
-        ["false value", { id: "sol-2", value: false }],
+        ["false value", { id: "sol-2", value: true }],
         [
           "complex id format",
           {
             id: "solution-uuid-550e8400-e29b-41d4-a716-446655440000",
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
