# Mutant d9faa3f8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4402
**Stable ID**: d9faa3f8
**Location**: L291:14–L291:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4402
@@ -287,9 +287,9 @@
         });
       });
     });
 
-    describe("suggestApprovedAtPatches", () => {
+    describe("", () => {
       it("should suggest approvedAt for approved status without timestamp", () => {
         const mockDate = "2023-12-01T10:00:00.000Z";
         vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
