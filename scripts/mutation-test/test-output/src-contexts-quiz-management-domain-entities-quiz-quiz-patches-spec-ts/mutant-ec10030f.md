# Mutant ec10030f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2429
**Stable ID**: ec10030f
**Location**: L727:60–L727:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2429
@@ -723,9 +723,9 @@
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["question", 1], code: "invalid", message: "Invalid" },
+        { path: ["question", 1], code: "invalid", message: "" },
       ];
 
       const result = suggestQuizPatches(validQuizInput, issues);
       // Should still include consistency patches
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
