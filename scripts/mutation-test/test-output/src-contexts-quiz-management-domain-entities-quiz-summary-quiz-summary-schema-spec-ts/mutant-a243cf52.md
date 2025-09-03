# Mutant a243cf52 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5185
**Stable ID**: a243cf52
**Location**: L181:10–L181:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5185
@@ -177,9 +177,9 @@
     });
 
     describe("Status Field", () => {
       it.each([
-        ["pending_approval", "pending_approval", true],
+        ["", "pending_approval", true],
         ["approved without approvedAt", "approved", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
