# Mutant 0c0c1b01 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2970
**Stable ID**: 0c0c1b01
**Location**: L161:39–L161:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2970
@@ -157,9 +157,9 @@
       });
 
       it.each([
         ["missing id", { value: true }],
-        ["empty id", { id: "", value: true }],
+        ["empty id", { id: "", value: false }],
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
         ["empty object", {}],
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
