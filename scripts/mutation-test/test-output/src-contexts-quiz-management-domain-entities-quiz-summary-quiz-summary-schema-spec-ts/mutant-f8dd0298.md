# Mutant f8dd0298 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5254
**Stable ID**: f8dd0298
**Location**: L265:72–L273:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5254
@@ -261,17 +261,9 @@
           );
         }
       });
 
-      it("should accept non-approved status without approvedAt", () => {
-        const pendingData = {
-          ...validQuizSummaryData,
-          status: "pending_approval" as const,
-          approvedAt: undefined,
-        };
-        const result = QuizSummarySchema.safeParse(pendingData);
-        expect(result.success).toBe(true);
-      });
+      it("should accept non-approved status without approvedAt", () => {});
 
       it("should accept rejected status without approvedAt", () => {
         const rejectedData = {
           ...validQuizSummaryData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
