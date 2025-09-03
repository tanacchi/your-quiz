# Mutant 6adc760b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 242
**Stable ID**: 6adc760b
**Location**: L127:46–L162:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #242
@@ -123,45 +123,10 @@
         }
       });
     });
 
-    describe("Limit Field Validation", () => {
-      it.each([
-        ["minimum valid limit", 1, true],
-        ["default limit", 10, true],
-        ["moderate limit", 50, true],
-        ["maximum valid limit", 100, true],
-        ["zero limit", 0, false],
-        ["negative limit", -1, false],
-        ["over maximum limit", 101, false],
-        ["decimal number", 10.5, false],
-        ["string number", "10", false],
-        ["null value", null, false],
-        ["undefined value", undefined, true], // Should apply default
-      ])("should validate limit: %s -> %s", (_desc, limit, isValid) => {
-        const input = limit === undefined ? {} : { limit };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(isValid);
+    describe("Limit Field Validation", () => {});
 
-        if (isValid && result.success) {
-          if (limit !== undefined) {
-            expect(result.data.limit).toBe(limit);
-          } else {
-            expect(result.data.limit).toBe(10); // default
-          }
-        }
-      });
-
-      it("should apply default limit when undefined", () => {
-        const result = listQuizzesQuerySchema.safeParse({});
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.limit).toBe(10);
-        }
-      });
-    });
-
     describe("Offset Field Validation", () => {
       it.each([
         ["zero offset", 0, true],
         ["small offset", 10, true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
