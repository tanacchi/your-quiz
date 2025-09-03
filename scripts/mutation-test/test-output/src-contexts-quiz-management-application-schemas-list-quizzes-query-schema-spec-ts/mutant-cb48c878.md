# Mutant cb48c878 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 781
**Stable ID**: cb48c878
**Location**: L643:10–L643:71

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #781
@@ -639,9 +639,9 @@
         expect(result.success).toBe(true);
         expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
       });
 
-      it("should maintain memory efficiency with repeated validations", () => {
+      it("", () => {
         const input = { status: ["approved"], limit: 10, offset: 0 };
 
         // Validate the same input multiple times
         for (let i = 0; i < 100; i++) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
