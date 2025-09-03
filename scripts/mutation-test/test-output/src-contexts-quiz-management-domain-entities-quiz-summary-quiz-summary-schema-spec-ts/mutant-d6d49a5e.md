# Mutant d6d49a5e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5287
**Stable ID**: d6d49a5e
**Location**: L316:10–L316:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5287
@@ -312,9 +312,9 @@
           );
         }
       });
 
-      it("should accept empty tag IDs array", () => {
+      it("", () => {
         const dataWithEmptyTagIds = {
           ...validQuizSummaryData,
           tagIds: [],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
