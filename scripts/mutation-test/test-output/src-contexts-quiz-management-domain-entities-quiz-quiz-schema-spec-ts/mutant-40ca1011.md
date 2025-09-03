# Mutant 40ca1011 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2949
**Stable ID**: 40ca1011
**Location**: L144:14–L144:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2949
@@ -140,9 +140,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Solution Field", () => {
+    describe("", () => {
       it("should accept valid BooleanSolution", () => {
         const validSolution = {
           id: "solution-456",
           value: false,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
