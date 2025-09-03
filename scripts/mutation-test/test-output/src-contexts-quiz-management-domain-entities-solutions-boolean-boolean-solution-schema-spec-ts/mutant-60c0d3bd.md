# Mutant 60c0d3bd Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5805
**Stable ID**: 60c0d3bd
**Location**: L80:14–L80:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5805
@@ -76,9 +76,9 @@
         }
       });
     });
 
-    describe("Value Field Validation", () => {
+    describe("", () => {
       it.each([
         ["true boolean", true, true],
         ["false boolean", false, true],
         ["string 'true'", "true", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
