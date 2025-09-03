# Mutant c3cb5b35 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6249
**Stable ID**: c3cb5b35
**Location**: L185:36–L185:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6249
@@ -181,9 +181,9 @@
       if (result.isErr()) {
         const { issues } = result.error;
         expect(
           issues.some((issue) =>
-            issue.message.includes("cannot reference itself"),
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
