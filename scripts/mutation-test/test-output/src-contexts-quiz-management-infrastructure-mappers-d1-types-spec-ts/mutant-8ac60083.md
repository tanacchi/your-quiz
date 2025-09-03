# Mutant 8ac60083 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7491
**Stable ID**: 8ac60083
**Location**: L77:29–L80:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7491
@@ -73,12 +73,9 @@
   ) => {
     const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
     expect(parseResult.isOk()).toBe(true);
 
-    if (parseResult.isOk()) {
-      const { success } = parseResult.value;
-      expect(success).toBe(true);
-    }
+    if (parseResult.isOk()) {}
   };
 
   /**
    * Zodスキーマの不正なパース結果をテストするヘルパー関数
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
