# Mutant bbec00ce Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5915
**Stable ID**: bbec00ce
**Location**: L164:10–L164:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5915
@@ -160,9 +160,9 @@
           expect(result.data.value).toBe(true);
         }
       });
 
-      it("should accept minimal valid data with false value", () => {
+      it("", () => {
         const minimalData = {
           id: "s",
           value: false,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
