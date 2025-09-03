# Mutant 0cf92cbc Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7493
**Stable ID**: 0cf92cbc
**Location**: L89:8–L97:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7493
@@ -85,18 +85,10 @@
    */
   const expectInvalidParse = (
     schema: { safeParse: (data: unknown) => { success: boolean } },
     data: unknown,
-  ) => {
-    const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
-    expect(parseResult.isOk()).toBe(true);
+  ) => {};
 
-    if (parseResult.isOk()) {
-      const { success } = parseResult.value;
-      expect(success).toBe(false);
-    }
-  };
-
   describe("Schema Validation", () => {
     describe("Answer Type Schema", () => {
       test("should validate valid answer types", () => {
         const validTypes = [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
