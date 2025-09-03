# Mutant bbdd27a6 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6017
**Stable ID**: bbdd27a6
**Location**: L281:23–L281:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6017
@@ -277,9 +277,9 @@
     it("should maintain data integrity through multiple validations", () => {
       let currentData = validBooleanSolutionData;
 
       // Validate multiple times to ensure consistency
-      for (let i = 0; i < 5; i++) {
+      for (let i = 0; false; i++) {
         const result = BooleanSolutionSchema.safeParse(currentData);
         expect(result.success).toBe(true);
 
         if (result.success) {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
