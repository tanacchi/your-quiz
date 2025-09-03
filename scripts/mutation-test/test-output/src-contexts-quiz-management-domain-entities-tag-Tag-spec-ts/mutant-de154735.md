# Mutant de154735 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6246
**Stable ID**: de154735
**Location**: L181:27–L188:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6246
@@ -177,16 +177,9 @@
 
       const result = Tag.from(selfReferencingData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
-        const { issues } = result.error;
-        expect(
-          issues.some((issue) =>
-            issue.message.includes("cannot reference itself"),
-          ),
-        ).toBe(true);
-      }
+      if (result.isErr()) {}
     });
   });
 
   describe("Business Logic", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
