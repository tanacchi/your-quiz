# Mutant d0df4348 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7498
**Stable ID**: d0df4348
**Location**: L93:29–L96:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7498
@@ -89,12 +89,9 @@
   ) => {
     const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
     expect(parseResult.isOk()).toBe(true);
 
-    if (parseResult.isOk()) {
-      const { success } = parseResult.value;
-      expect(success).toBe(false);
-    }
+    if (parseResult.isOk()) {}
   };
 
   describe("Schema Validation", () => {
     describe("Answer Type Schema", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
