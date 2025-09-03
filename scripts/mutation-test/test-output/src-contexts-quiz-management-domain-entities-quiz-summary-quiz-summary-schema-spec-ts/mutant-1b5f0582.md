# Mutant 1b5f0582 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5258
**Stable ID**: 1b5f0582
**Location**: L275:68–L283:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5258
@@ -271,17 +271,9 @@
         const result = QuizSummarySchema.safeParse(pendingData);
         expect(result.success).toBe(true);
       });
 
-      it("should accept rejected status without approvedAt", () => {
-        const rejectedData = {
-          ...validQuizSummaryData,
-          status: "rejected" as const,
-          approvedAt: undefined,
-        };
-        const result = QuizSummarySchema.safeParse(rejectedData);
-        expect(result.success).toBe(true);
-      });
+      it("should accept rejected status without approvedAt", () => {});
     });
 
     describe("Duplicate TagIds Validation", () => {
       it("should accept unique tag IDs", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
