# Mutant cbecc069 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4644
**Stable ID**: cbecc069
**Location**: L539:28–L539:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4644
@@ -535,9 +535,9 @@
           expect(patched.tagIds).toEqual(["valid", "trimmed"]);
         });
 
         it("should handle approved status patch integration", () => {
-          const mockDate = "2023-12-01T10:00:00.000Z";
+          const mockDate = "";
           vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);
 
           const input = {
             status: "approved" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
