# Mutant e8801ceb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5002
**Stable ID**: e8801ceb
**Location**: L66:10–L66:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5002
@@ -62,9 +62,9 @@
 
     describe("CreatorId", () => {
       it.each([
         ["valid format", "creator-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
+        ["", "550e8400-e29b-41d4-a716-446655440000", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
