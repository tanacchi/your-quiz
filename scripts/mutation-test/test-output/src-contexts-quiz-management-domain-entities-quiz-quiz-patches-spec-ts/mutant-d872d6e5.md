# Mutant d872d6e5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2454
**Stable ID**: d872d6e5
**Location**: L754:31–L756:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2454
@@ -750,11 +750,9 @@
     });
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizInput };
-      const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       const patches = suggestQuizPatches(input, issues);
       const patched = applyEntityPatches(input, patches);
       if (typeof patched === "function") {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
