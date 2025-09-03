# Mutant b24fd9f0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6107
**Stable ID**: b24fd9f0
**Location**: L27:41–L38:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6107
@@ -23,20 +23,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("UserId validation", () => {
-      it.each([
-        ["valid alphanumeric", "user-1", true],
-        ["valid with numbers", "user123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = UserId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("UserId validation", () => {});
 
     describe("RelationType validation", () => {
       it.each([
         ["hierarchy", "hierarchy", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
