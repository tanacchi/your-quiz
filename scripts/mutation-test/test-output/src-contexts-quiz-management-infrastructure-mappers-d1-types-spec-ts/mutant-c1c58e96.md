# Mutant c1c58e96 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7627
**Stable ID**: c1c58e96
**Location**: L284:34–L286:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7627
@@ -280,11 +280,9 @@
           choiceWithStringIndex,
         );
 
         expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.orderIndex).toBe(2);
-        }
+        if (parseResult.success) {}
       });
 
       test("should reject invalid parsed choice", () => {
         const requiredFields = [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
