# Mutant b7ded58e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6916
**Stable ID**: b7ded58e
**Location**: L72:10–L72:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6916
@@ -68,9 +68,9 @@
         ["synonym", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
-        ["null value", null, false],
+        ["", null, false],
       ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
