# Mutant abb6122e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5751
**Stable ID**: abb6122e
**Location**: L51:14–L51:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5751
@@ -47,9 +47,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("ID Field Validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "solution-123", true],
         ["valid with underscore", "solution_test", true],
         ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
