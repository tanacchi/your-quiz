# Mutant daa20dce Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1554
**Stable ID**: daa20dce
**Location**: L841:45–L859:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1554
@@ -837,25 +837,7 @@
         }
       }
     });
 
-    it("should suggest status fixes", () => {
-      const result = Quiz.from({
-        ...validQuizData,
-        status: "pending",
-      });
-
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const statusPatch = result.error.patches.find(
-          (patch) =>
-            typeof patch === "object" && patch !== null && "status" in patch,
-        );
-        expect(statusPatch).toBeDefined();
-        if (statusPatch && "status" in statusPatch) {
-          expect(statusPatch.status).toBe("pending_approval");
-        }
-      }
-    });
+    it("should suggest status fixes", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
