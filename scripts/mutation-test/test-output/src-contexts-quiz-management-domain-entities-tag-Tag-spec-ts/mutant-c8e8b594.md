# Mutant c8e8b594 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6234
**Stable ID**: c8e8b594
**Location**: L160:36–L160:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6234
@@ -156,9 +156,9 @@
       if (result.isErr()) {
         const { issues } = result.error;
         expect(
           issues.some((issue) =>
-            issue.message.includes("Duplicate related tag IDs"),
+            issue.message.includes(""),
           ),
         ).toBe(true);
       }
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
