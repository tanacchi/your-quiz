# Mutant 7b4d02ac Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6157
**Stable ID**: 7b4d02ac
**Location**: L48:10–L48:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6157
@@ -44,9 +44,9 @@
         ["synonym", "synonym", true],
         ["related", "related", true],
         ["invalid type", "invalid", false],
         ["empty string", "", false],
-        ["null value", null, false],
+        ["", null, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
