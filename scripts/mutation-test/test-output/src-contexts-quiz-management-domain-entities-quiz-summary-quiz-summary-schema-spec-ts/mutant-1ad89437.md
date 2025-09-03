# Mutant 1ad89437 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5017
**Stable ID**: 1ad89437
**Location**: L76:14–L76:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5017
@@ -72,9 +72,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("TagId", () => {
+    describe("", () => {
       it.each([
         ["valid format", "tag-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
