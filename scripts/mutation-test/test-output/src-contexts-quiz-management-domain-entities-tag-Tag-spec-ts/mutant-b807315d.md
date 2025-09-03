# Mutant b807315d Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6159
**Stable ID**: b807315d
**Location**: L49:10–L49:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6159
@@ -45,9 +45,9 @@
         ["related", "related", true],
         ["invalid type", "invalid", false],
         ["empty string", "", false],
         ["null value", null, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      ])("", (_desc, input, isValid) => {
         const result = RelationType.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
