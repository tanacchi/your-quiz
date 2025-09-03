# Mutant 7da24980 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2453
**Stable ID**: 7da24980
**Location**: L753:21–L753:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2453
@@ -749,9 +749,9 @@
       });
     });
 
     it("should preserve original input when no patches are applicable", () => {
-      const input = { ...validQuizInput };
+      const input = {};
       const issues: Issue[] = [
         { path: ["unknownField"], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
