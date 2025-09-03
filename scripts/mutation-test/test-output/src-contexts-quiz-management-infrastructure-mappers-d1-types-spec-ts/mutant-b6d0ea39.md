# Mutant b6d0ea39 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7560
**Stable ID**: b6d0ea39
**Location**: L179:12–L179:53

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7560
@@ -175,9 +175,9 @@
           expect(parseResult.data.id).toBe("123");
         }
       });
 
-      test("should handle optional fields correctly", () => {
+      test("", () => {
         const baseRow = createValidQuizRow();
         const rowWithOptionals = {
           ...baseRow,
           explanation: "Test explanation",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
