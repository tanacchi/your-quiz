# Mutant fda8c278 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 7568
**Stable ID**: fda8c278
**Location**: L188:27–L188:32

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7568
@@ -184,9 +184,9 @@
           approved_at: "2023-01-02T00:00:00Z",
           boolean_value: true,
           correct_answer: "test",
           matching_strategy: "exact",
-          case_sensitive: false,
+          case_sensitive: true,
           choices: '{"test": "value"}',
           min_correct_answers: 2,
         };
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
