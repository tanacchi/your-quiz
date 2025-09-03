# Mutant baa3ec1f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2418
**Stable ID**: baa3ec1f
**Location**: L724:8–L724:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2418
@@ -720,9 +720,9 @@
       // Should still include consistency patches
       expect(Array.isArray(result)).toBe(true);
     });
 
-    it("should handle issues with non-string paths", () => {
+    it("", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
         { path: ["question", 1], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
