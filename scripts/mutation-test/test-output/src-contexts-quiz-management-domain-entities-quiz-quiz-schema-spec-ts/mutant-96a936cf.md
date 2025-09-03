# Mutant 96a936cf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3185
**Stable ID**: 96a936cf
**Location**: L400:10–L400:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3185
@@ -396,9 +396,9 @@
     });
 
     describe("Complex Boolean Solutions", () => {
       it.each([
-        ["true value", { id: "sol-1", value: true }],
+        ["", { id: "sol-1", value: true }],
         ["false value", { id: "sol-2", value: false }],
         [
           "complex id format",
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
