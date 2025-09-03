# Mutant e7d101a7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2968
**Stable ID**: e7d101a7
**Location**: L161:22–L161:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2968
@@ -157,9 +157,9 @@
       });
 
       it.each([
         ["missing id", { value: true }],
-        ["empty id", { id: "", value: true }],
+        ["empty id", {}],
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
         ["empty object", {}],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
