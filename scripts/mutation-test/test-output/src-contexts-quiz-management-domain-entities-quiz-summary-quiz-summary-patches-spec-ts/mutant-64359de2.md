# Mutant 64359de2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4404
**Stable ID**: 64359de2
**Location**: L292:10–L292:75

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4404
@@ -288,9 +288,9 @@
       });
     });
 
     describe("suggestApprovedAtPatches", () => {
-      it("should suggest approvedAt for approved status without timestamp", () => {
+      it("", () => {
         const mockDate = "2023-12-01T10:00:00.000Z";
         vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
 
         const input = { status: "approved" as const, approvedAt: undefined };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
