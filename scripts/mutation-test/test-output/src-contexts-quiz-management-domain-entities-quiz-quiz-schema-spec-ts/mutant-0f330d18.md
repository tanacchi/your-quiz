# Mutant 0f330d18 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3085
**Stable ID**: 0f330d18
**Location**: L255:10–L255:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3085
@@ -251,9 +251,9 @@
           expect(result.data.approvedAt).toBeUndefined();
         }
       });
 
-      it("should accept valid approvedAt", () => {
+      it("", () => {
         const dataWithApprovedAt = {
           ...validQuizData,
           approvedAt: "2023-12-02 15:00:00",
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
