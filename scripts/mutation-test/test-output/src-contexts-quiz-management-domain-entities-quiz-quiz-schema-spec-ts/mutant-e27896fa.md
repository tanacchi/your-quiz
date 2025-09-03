# Mutant e27896fa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3181
**Stable ID**: e27896fa
**Location**: L398:14–L398:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3181
@@ -394,9 +394,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("Complex Boolean Solutions", () => {
+    describe("", () => {
       it.each([
         ["true value", { id: "sol-1", value: true }],
         ["false value", { id: "sol-2", value: false }],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
