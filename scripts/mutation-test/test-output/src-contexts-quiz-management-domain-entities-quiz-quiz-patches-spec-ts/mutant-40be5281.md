# Mutant 40be5281 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2422
**Stable ID**: 40be5281
**Location**: L726:17–L726:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2422
@@ -722,9 +722,9 @@
     });
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
         { path: ["question", 1], code: "invalid", message: "Invalid" },
       ];
 
       const result = suggestQuizPatches(validQuizInput, issues);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
