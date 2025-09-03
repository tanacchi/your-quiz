# Mutant ea53207a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4406
**Stable ID**: ea53207a
**Location**: L293:26–L293:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4406
@@ -289,9 +289,9 @@
     });
 
     describe("suggestApprovedAtPatches", () => {
       it("should suggest approvedAt for approved status without timestamp", () => {
-        const mockDate = "2023-12-01T10:00:00.000Z";
+        const mockDate = "";
         vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
 
         const input = { status: "approved" as const, approvedAt: undefined };
         const result = suggestApprovedAtPatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
