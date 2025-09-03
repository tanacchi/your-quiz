# Mutant bf00e038 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6884
**Stable ID**: bf00e038
**Location**: L57:10–L57:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6884
@@ -53,9 +53,9 @@
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
         ["valid single char", "u", true],
         ["empty string", "", false],
         ["null value", null, false],
-        ["undefined value", undefined, false],
+        ["", undefined, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = UserId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
