# Mutant 1670c3ca Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5992
**Stable ID**: 1670c3ca
**Location**: L237:8–L237:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5992
@@ -233,9 +233,9 @@
         }
       });
     });
 
-    it("should handle solutions with complex IDs", () => {
+    it("", () => {
       const complexSolutions = [
         {
           id: "quiz-123-solution-456-boolean-true",
           value: true,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
