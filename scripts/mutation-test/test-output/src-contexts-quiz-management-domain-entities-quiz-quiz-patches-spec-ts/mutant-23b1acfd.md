# Mutant 23b1acfd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2456
**Stable ID**: 23b1acfd
**Location**: L755:17–L755:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2456
@@ -751,9 +751,9 @@
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizInput };
       const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
       ];
 
       const patches = suggestQuizPatches(input, issues);
       const patched = applyEntityPatches(input, patches);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
