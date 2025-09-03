# Mutant 8816c0ee Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1483
**Stable ID**: 8816c0ee
**Location**: L771:71–L792:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1483
@@ -767,30 +767,9 @@
 
           expect(draft.get("explanation")).toBe("Added by object patch");
         });
 
-        it("should handle patch application errors gracefully", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-patch-error",
-            question: "Patch error test?",
-            answerType: "boolean",
-            solution: { id: "sol-error", value: true },
-            status: "pending_approval",
-            creatorId: "creator-error",
-            createdAt: "2023-12-01 10:00:00",
-          });
-
-          // Should not crash when empty patches array is provided
-          expect(() => {
-            draft.applyPatches([]);
-          }).not.toThrow();
-
-          // Should not crash when valid patch is provided
-          expect(() => {
-            draft.applyPatches([{ explanation: "Test explanation" }]);
-          }).not.toThrow();
-        });
+        it("should handle patch application errors gracefully", () => {});
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
