# Mutant 62c8fd88 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5190
**Stable ID**: 62c8fd88
**Location**: L182:41–L182:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5190
@@ -178,9 +178,9 @@
 
     describe("Status Field", () => {
       it.each([
         ["pending_approval", "pending_approval", true],
-        ["approved without approvedAt", "approved", false],
+        ["approved without approvedAt", "", false],
         ["rejected", "rejected", true],
         ["invalid status", "invalid_status", false],
         ["empty string", "", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
