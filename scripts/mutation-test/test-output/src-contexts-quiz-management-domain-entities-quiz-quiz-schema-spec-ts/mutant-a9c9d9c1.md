# Mutant a9c9d9c1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2951
**Stable ID**: a9c9d9c1
**Location**: L145:10–L145:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2951
@@ -141,9 +141,9 @@
       });
     });
 
     describe("Solution Field", () => {
-      it("should accept valid BooleanSolution", () => {
+      it("", () => {
         const validSolution = {
           id: "solution-456",
           value: false,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
