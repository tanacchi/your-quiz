# Mutant 32af46bc Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6009
**Stable ID**: 32af46bc
**Location**: L264:8–L264:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6009
@@ -260,9 +260,9 @@
         }
       });
     });
 
-    it("should work with JSON serialization/deserialization", () => {
+    it("", () => {
       const originalData = validBooleanSolutionData;
       const jsonString = JSON.stringify(originalData);
       const parsedData = JSON.parse(jsonString);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
