# Mutant 1c42a1de Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 505
**Stable ID**: 1c42a1de
**Location**: L334:10–L334:64

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #505
@@ -330,9 +330,9 @@
           expect(typeof result.data.offset).toBe("number");
         }
       });
 
-      it("should handle mixed valid and invalid data correctly", () => {
+      it("", () => {
         const mixedInput = {
           status: ["approved"], // valid
           creatorId: "", // invalid - empty string
           limit: "15", // valid
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
