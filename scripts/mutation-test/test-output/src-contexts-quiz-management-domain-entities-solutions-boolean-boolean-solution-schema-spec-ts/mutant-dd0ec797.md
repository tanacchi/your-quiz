# Mutant dd0ec797 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5933
**Stable ID**: dd0ec797
**Location**: L186:29–L191:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5933
@@ -182,14 +182,9 @@
           validBooleanSolutionData,
         );
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(typeof result.data.value).toBe("boolean");
-          expect(
-            result.data.value === true || result.data.value === false,
-          ).toBe(true);
-        }
+        if (result.success) {}
       });
 
       it("should preserve boolean type across multiple validations", () => {
         const trueData = { id: "test-true", value: true };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
