# Mutant 9b6b3183 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2069
**Stable ID**: 9b6b3183
**Location**: L347:12–L347:62

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2069
@@ -343,9 +343,9 @@
 
           vi.restoreAllMocks();
         });
 
-        it("should apply solution correction patch correctly", () => {
+        it("", () => {
           const input = {
             ...validQuizInput,
             solution: { id: "  solution-123  ", value: "true" },
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
