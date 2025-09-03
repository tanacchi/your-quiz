# Mutant 2e4e06bc Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7791
**Stable ID**: 2e4e06bc
**Location**: L499:38–L501:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7791
@@ -495,11 +495,9 @@
             created_at: "2023-01-01T00:00:00Z",
           }) satisfies unknown,
       );
 
-      largeDataset.forEach((item) => {
-        expect(isQuizRow(item)).toBe(true);
-      });
+      largeDataset.forEach((item) => {});
 
       const endTime = performance.now();
       const executionTime = endTime - startTime;
       expect(executionTime).toBeLessThan(100); // Should complete within 100ms
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
