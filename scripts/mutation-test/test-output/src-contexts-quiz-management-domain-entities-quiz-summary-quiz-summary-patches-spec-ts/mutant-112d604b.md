# Mutant 112d604b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4703
**Stable ID**: 112d604b
**Location**: L611:8–L611:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4703
@@ -607,9 +607,9 @@
         expect(Array.isArray(result)).toBe(true);
       });
     });
 
-    it("should preserve original input when no patches are applicable", () => {
+    it("", () => {
       const input = { ...validQuizSummaryInput };
       const issues: Issue[] = [
         { path: ["unknownField"], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
