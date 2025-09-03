# Mutant d910432a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2426
**Stable ID**: d910432a
**Location**: L727:17–L727:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2426
@@ -723,9 +723,9 @@
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["question", 1], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
       ];
 
       const result = suggestQuizPatches(validQuizInput, issues);
       // Should still include consistency patches
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
