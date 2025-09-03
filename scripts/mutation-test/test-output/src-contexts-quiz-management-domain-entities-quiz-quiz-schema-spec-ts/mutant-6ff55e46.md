# Mutant 6ff55e46 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2965
**Stable ID**: 6ff55e46
**Location**: L160:33–L160:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2965
@@ -156,9 +156,9 @@
         }
       });
 
       it.each([
-        ["missing id", { value: true }],
+        ["missing id", { value: false }],
         ["empty id", { id: "", value: true }],
         ["missing value", { id: "solution-123" }],
         ["invalid value type", { id: "solution-123", value: "true" }],
         ["null solution", null],
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
