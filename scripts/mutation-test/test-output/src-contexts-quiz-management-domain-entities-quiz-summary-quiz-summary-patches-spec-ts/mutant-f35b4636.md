# Mutant f35b4636 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4432
**Stable ID**: f35b4636
**Location**: L326:28–L326:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4432
@@ -322,9 +322,9 @@
       });
 
       describe("Patch Application", () => {
         it("should apply approvedAt patch correctly", () => {
-          const mockDate = "2023-12-01T10:00:00.000Z";
+          const mockDate = "";
           vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
 
           const input = {
             ...validQuizSummaryInput,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
