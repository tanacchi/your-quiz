# Mutant 0abc6ad0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6862
**Stable ID**: 0abc6ad0
**Location**: L50:30–L62:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6862
@@ -46,21 +46,9 @@
         }
       });
     });
 
-    describe("UserId", () => {
-      it.each([
-        ["valid format", "user-123", true],
-        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["valid single char", "u", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
-        const result = UserId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("UserId", () => {});
 
     describe("RelationType", () => {
       it.each([
         ["hierarchy", "hierarchy", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
