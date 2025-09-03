# Mutant d062d071 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 4705
**Stable ID**: d062d071
**Location**: L612:21–L612:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4705
@@ -608,9 +608,9 @@
       });
     });
 
     it("should preserve original input when no patches are applicable", () => {
-      const input = { ...validQuizSummaryInput };
+      const input = {};
       const issues: Issue[] = [
         { path: ["unknownField"], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
