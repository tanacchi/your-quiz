# Mutant bf97ab16 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7486
**Stable ID**: bf97ab16
**Location**: L73:8–L81:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7486
@@ -69,18 +69,10 @@
    */
   const expectValidParse = <T>(
     schema: { safeParse: (data: unknown) => { success: boolean; data?: T } },
     data: unknown,
-  ) => {
-    const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
-    expect(parseResult.isOk()).toBe(true);
+  ) => {};
 
-    if (parseResult.isOk()) {
-      const { success } = parseResult.value;
-      expect(success).toBe(true);
-    }
-  };
-
   /**
    * Zodスキーマの不正なパース結果をテストするヘルパー関数
    */
   const expectInvalidParse = (
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
