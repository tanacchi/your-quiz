# Mutant 48a41f4e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4428
**Stable ID**: 48a41f4e
**Location**: L324:16–L324:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4428
@@ -320,9 +320,9 @@
         );
         expect(result).toEqual([]);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply approvedAt patch correctly", () => {
           const mockDate = "2023-12-01T10:00:00.000Z";
           vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
