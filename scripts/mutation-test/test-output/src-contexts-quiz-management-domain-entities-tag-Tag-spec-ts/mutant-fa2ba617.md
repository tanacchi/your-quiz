# Mutant fa2ba617 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6104
**Stable ID**: fa2ba617
**Location**: L21:10–L21:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6104
@@ -17,9 +17,9 @@
         ["valid with numbers", "tag123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      ])("", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
