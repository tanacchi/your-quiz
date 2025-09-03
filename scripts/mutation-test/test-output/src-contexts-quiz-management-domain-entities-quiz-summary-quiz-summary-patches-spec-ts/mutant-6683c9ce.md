# Mutant 6683c9ce Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4430
**Stable ID**: 6683c9ce
**Location**: L325:12–L325:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4430
@@ -321,9 +321,9 @@
         expect(result).toEqual([]);
       });
 
       describe("Patch Application", () => {
-        it("should apply approvedAt patch correctly", () => {
+        it("", () => {
           const mockDate = "2023-12-01T10:00:00.000Z";
           vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
 
           const input = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
