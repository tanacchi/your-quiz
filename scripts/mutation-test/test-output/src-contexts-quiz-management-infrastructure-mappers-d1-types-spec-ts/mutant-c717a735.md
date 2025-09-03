# Mutant c717a735 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7782
**Stable ID**: c717a735
**Location**: L486:9–L486:25

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7782
@@ -482,9 +482,9 @@
   describe("Performance and Edge Cases", () => {
     test("should validate large dataset efficiently", () => {
       const startTime = performance.now();
       const largeDataset = Array.from(
-        { length: 1000 },
+        {},
         (_, i) =>
           ({
             id: String(i),
             question: `Question ${i}`,
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
