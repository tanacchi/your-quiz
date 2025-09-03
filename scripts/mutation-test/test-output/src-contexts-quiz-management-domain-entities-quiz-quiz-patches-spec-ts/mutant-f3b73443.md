# Mutant f3b73443 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2451
**Stable ID**: f3b73443
**Location**: L752:8–L752:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2451
@@ -748,9 +748,9 @@
         expect(Array.isArray(result)).toBe(true);
       });
     });
 
-    it("should preserve original input when no patches are applicable", () => {
+    it("", () => {
       const input = { ...validQuizInput };
       const issues: Issue[] = [
         { path: ["unknownField"], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
