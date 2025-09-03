# Mutant 7845fc2f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5040
**Stable ID**: 7845fc2f
**Location**: L89:14–L89:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5040
@@ -85,9 +85,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("TagIds", () => {
+    describe("", () => {
       it.each([
         ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
         ["empty array", [], []],
         ["null value", null, []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
