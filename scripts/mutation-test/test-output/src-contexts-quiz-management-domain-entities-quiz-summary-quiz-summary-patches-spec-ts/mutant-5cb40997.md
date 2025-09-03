# Mutant 5cb40997 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4405
**Stable ID**: 5cb40997
**Location**: L292:83–L302:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4405
@@ -288,20 +288,10 @@
       });
     });
 
     describe("suggestApprovedAtPatches", () => {
-      it("should suggest approvedAt for approved status without timestamp", () => {
-        const mockDate = "2023-12-01T10:00:00.000Z";
-        vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
+      it("should suggest approvedAt for approved status without timestamp", () => {});
 
-        const input = { status: "approved" as const, approvedAt: undefined };
-        const result = suggestApprovedAtPatches(input);
-
-        expect(result).toEqual([{ approvedAt: mockDate }]);
-
-        vi.restoreAllMocks();
-      });
-
       it.each([
         [
           "pending status without approvedAt",
           { status: "pending_approval", approvedAt: undefined },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
