# Mutant c7c57821 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2459
**Stable ID**: c7c57821
**Location**: L755:61–L755:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2459
@@ -751,9 +751,9 @@
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizInput };
       const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
+        { path: ["unknownField"], code: "invalid", message: "" },
       ];
 
       const patches = suggestQuizPatches(input, issues);
       const patched = applyEntityPatches(input, patches);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
