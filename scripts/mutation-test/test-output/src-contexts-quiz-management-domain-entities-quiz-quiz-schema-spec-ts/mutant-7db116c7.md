# Mutant 7db116c7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2967
**Stable ID**: 7db116c7
**Location**: L161:10–L161:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2967
@@ -157,9 +157,9 @@
       });
 
       it.each([
         ["missing id", { value: true }],
-        ["empty id", { id: "", value: true }],
+        ["", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
         ["empty object", {}],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
