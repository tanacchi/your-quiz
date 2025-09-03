# Mutant 6b274c4d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4711
**Stable ID**: 6b274c4d
**Location**: L614:61–L614:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4711
@@ -610,9 +610,9 @@
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizSummaryInput };
       const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
+        { path: ["unknownField"], code: "invalid", message: "" },
       ];
 
       const patches = suggestQuizSummaryPatches(input, issues);
       const patched = applyEntityPatches(input, patches);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
