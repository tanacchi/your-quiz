# Mutant 5b7c0aef Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6128
**Stable ID**: 5b7c0aef
**Location**: L34:61–L37:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6128
@@ -30,12 +30,9 @@
         ["valid with numbers", "user123", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = UserId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should handle %s: %s", (_desc, input, isValid) => {});
     });
 
     describe("RelationType validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
