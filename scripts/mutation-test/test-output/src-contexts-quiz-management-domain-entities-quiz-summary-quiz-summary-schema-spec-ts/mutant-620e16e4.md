# Mutant 620e16e4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5183
**Stable ID**: 620e16e4
**Location**: L180:15–L187:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5183
@@ -176,16 +176,9 @@
       );
     });
 
     describe("Status Field", () => {
-      it.each([
-        ["pending_approval", "pending_approval", true],
-        ["approved without approvedAt", "approved", false],
-        ["rejected", "rejected", true],
-        ["invalid status", "invalid_status", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
+      it.each([])("should validate status: %s -> %s", (_desc, status, isValid) => {
         const data = { ...validQuizSummaryData, status };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
