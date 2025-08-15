import { describe, expect, it, vi } from "vitest";
import type { Issue } from "../../../../../shared/validation/entity/types";
import {
  applyEntityPatch,
  applyEntityPatches,
  materializeEntityPatch,
} from "../../../../../shared/validation/entity/utils";
import {
  suggestAnswerTypePatches,
  suggestApprovedAtPatches,
  suggestExplanationPatches,
  suggestIdFieldPatches,
  suggestQuestionPatches,
  suggestQuizSummaryPatches,
  suggestStatusPatches,
  suggestTagIdsPatches,
} from "./quiz-summary-patches";
import type { QuizSummaryInput } from "./quiz-summary-schema";

describe("QuizSummary Patches", () => {
  const validQuizSummaryInput: QuizSummaryInput = {
    id: "quiz-123",
    question: "What is TypeScript?",
    answerType: "single_choice",
    solutionId: "solution-456",
    explanation: "TypeScript is a superset of JavaScript",
    tagIds: ["tag-1", "tag-2"],
    status: "pending_approval",
    creatorId: "creator-789",
    createdAt: "2023-12-01T10:00:00.000Z",
  };

  describe("Individual Patch Suggesters", () => {
    describe("suggestQuestionPatches", () => {
      it.each([
        [
          "untrimmed question",
          "  Valid question  ",
          [{ question: "Valid question" }],
        ],
        ["question with only spaces", "   ", [{ question: "Sample question" }]],
        ["empty string", "", [{ question: "Sample question" }]],
        ["valid question", "Valid question", []],
        ["non-string input", 123, []],
        ["null input", null, []],
        ["undefined input", undefined, []],
      ])("should handle %s", (_desc, input, expected) => {
        const result = suggestQuestionPatches(input);
        expect(result).toEqual(expected);
      });

      describe("Patch Application", () => {
        it("should apply trim patch correctly", () => {
          const input = { ...validQuizSummaryInput, question: "  Untrimmed  " };
          const patches = suggestQuestionPatches(input.question);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.question).toBe("Untrimmed");
        });

        it("should apply sample question patch correctly", () => {
          const input = { ...validQuizSummaryInput, question: "" };
          const patches = suggestQuestionPatches(input.question);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.question).toBe("Sample question");
        });
      });
    });

    describe("suggestExplanationPatches", () => {
      it.each([
        [
          "untrimmed explanation",
          "  Valid explanation  ",
          [{ explanation: "Valid explanation" }],
        ],
        ["valid explanation", "Valid explanation", []],
        ["empty string", "", []],
        ["non-string input", 123, []],
        ["null input", null, []],
        ["undefined input", undefined, []],
      ])("should handle %s", (_desc, input, expected) => {
        const result = suggestExplanationPatches(input);
        expect(result).toEqual(expected);
      });

      describe("Patch Application", () => {
        it("should apply trim patch correctly", () => {
          const input = {
            ...validQuizSummaryInput,
            explanation: "  Untrimmed explanation  ",
          };
          const patches = suggestExplanationPatches(input.explanation);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.explanation).toBe("Untrimmed explanation");
        });
      });
    });

    describe("suggestIdFieldPatches", () => {
      it.each([
        ["id field", "id"],
        ["solutionId field", "solutionId"],
        ["creatorId field", "creatorId"],
      ])("should handle %s", (_desc, fieldName) => {
        const suggester = suggestIdFieldPatches(
          fieldName as keyof QuizSummaryInput,
        );

        const testCases = [
          ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
          ["valid id", "valid-id", []],
          ["empty string", "", []],
          ["non-string input", 123, []],
        ];

        testCases.forEach(([_testDesc, input, expected]) => {
          const result = suggester(input);
          expect(result).toEqual(expected);
        });
      });

      describe("Patch Application", () => {
        it("should apply id trim patch correctly", () => {
          const input = { ...validQuizSummaryInput, id: "  quiz-123  " };
          const patches = suggestIdFieldPatches("id")(input.id);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.id).toBe("quiz-123");
        });
      });
    });

    describe("suggestAnswerTypePatches", () => {
      it.each([
        ["single typo", "single", [{ answerType: "single_choice" }]],
        ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
        ["bool typo", "bool", [{ answerType: "boolean" }]],
        ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
        ["free typo", "free", [{ answerType: "free_text" }]],
        ["text typo", "text", [{ answerType: "free_text" }]],
        [
          "answerType contains free",
          "free_form",
          [{ answerType: "free_text" }],
        ],
        ["unknown typo", "unknown_type", []],
        ["non-string input", 123, []],
        ["null input", null, []],
      ])("should handle %s", (_desc, input, expected) => {
        const result = suggestAnswerTypePatches(input);
        expect(result).toEqual(expected);
      });

      describe("Patch Application", () => {
        it("should apply answerType correction patch correctly", () => {
          const input = { ...validQuizSummaryInput, answerType: "single" };
          const patches = suggestAnswerTypePatches(input.answerType);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.answerType).toBe("single_choice");
        });
      });
    });

    describe("suggestStatusPatches", () => {
      it.each([
        ["pending typo", "pending", [{ status: "pending_approval" }]],
        ["waiting typo", "waiting", [{ status: "pending_approval" }]],
        ["approve typo", "approve", [{ status: "approved" }]],
        ["accept typo", "accept", [{ status: "approved" }]],
        ["reject typo", "reject", [{ status: "rejected" }]],
        ["decline typo", "decline", [{ status: "rejected" }]],
        [
          "pending_approval contains pending",
          "pending_approval",
          [{ status: "pending_approval" }],
        ],
        ["unknown typo", "unknown_status", []],
        ["non-string input", 123, []],
        ["null input", null, []],
      ])("should handle %s", (_desc, input, expected) => {
        const result = suggestStatusPatches(input);
        expect(result).toEqual(expected);
      });

      describe("Patch Application", () => {
        it("should apply status correction patch correctly", () => {
          const input = { ...validQuizSummaryInput, status: "pending" };
          const patches = suggestStatusPatches(input.status);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.status).toBe("pending_approval");
        });
      });
    });

    describe("suggestTagIdsPatches", () => {
      it("should handle null tagIds", () => {
        const result = suggestTagIdsPatches(null);
        expect(result).toEqual([{ tagIds: [] }]);
      });

      it("should handle undefined tagIds", () => {
        const result = suggestTagIdsPatches(undefined);
        expect(result).toEqual([{ tagIds: [] }]);
      });

      it("should handle array with mixed valid/invalid values", () => {
        const input = ["valid-tag", "", "  another-tag  ", 123, null];
        const result = suggestTagIdsPatches(input);

        expect(result).toHaveLength(1);
        expect(typeof result[0]).toBe("function");

        // Test the function patch
        const functionPatch = result[0] as () => Partial<QuizSummaryInput>;
        const patchResult = functionPatch();
        expect(patchResult.tagIds).toEqual(["valid-tag", "another-tag"]);
      });

      it("should handle valid array", () => {
        const input = ["tag-1", "tag-2"];
        const result = suggestTagIdsPatches(input);

        expect(result).toHaveLength(1);
        const functionPatch = result[0] as () => Partial<QuizSummaryInput>;
        const patchResult = functionPatch();
        expect(patchResult.tagIds).toEqual(["tag-1", "tag-2"]);
      });

      describe("Patch Application", () => {
        it("should apply null tagIds patch correctly", () => {
          const input = { ...validQuizSummaryInput, tagIds: null };
          const patches = suggestTagIdsPatches(input.tagIds);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.tagIds).toEqual([]);
        });

        it("should apply function patch correctly", () => {
          const input = {
            ...validQuizSummaryInput,
            tagIds: ["valid", "", " trimmed "],
          };
          const patches = suggestTagIdsPatches(input.tagIds);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.tagIds).toEqual(["valid", "trimmed"]);
        });

        it("should materialize function patch correctly", () => {
          const input = ["valid", "", " trimmed "];
          const patches = suggestTagIdsPatches(input);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const materializedPatch = materializeEntityPatch(patch);

          expect(materializedPatch.tagIds).toEqual(["valid", "trimmed"]);
        });
      });
    });

    describe("suggestApprovedAtPatches", () => {
      it("should suggest approvedAt for approved status without timestamp", () => {
        const mockDate = "2023-12-01T10:00:00.000Z";
        vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);

        const input = { status: "approved" as const, approvedAt: undefined };
        const result = suggestApprovedAtPatches(input);

        expect(result).toEqual([{ approvedAt: mockDate }]);

        vi.restoreAllMocks();
      });

      it.each([
        [
          "pending status without approvedAt",
          { status: "pending_approval", approvedAt: undefined },
        ],
        [
          "rejected status without approvedAt",
          { status: "rejected", approvedAt: undefined },
        ],
        [
          "approved status with approvedAt",
          { status: "approved", approvedAt: "2023-12-01T10:00:00.000Z" },
        ],
      ])("should not suggest patch for %s", (_desc, input) => {
        const result = suggestApprovedAtPatches(
          input as Partial<QuizSummaryInput>,
        );
        expect(result).toEqual([]);
      });

      describe("Patch Application", () => {
        it("should apply approvedAt patch correctly", () => {
          const mockDate = "2023-12-01T10:00:00.000Z";
          vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);

          const input = {
            ...validQuizSummaryInput,
            status: "approved" as const,
            approvedAt: undefined,
          };
          const patches = suggestApprovedAtPatches(input);
          expect(patches).toHaveLength(1);
          const patch = patches[0];
          if (!patch) throw new Error("Expected patch to exist");
          const patched = applyEntityPatch(input, patch);

          expect(patched.approvedAt).toBe(mockDate);

          vi.restoreAllMocks();
        });
      });
    });
  });

  describe("Integrated Patch Suggester", () => {
    describe("suggestQuizSummaryPatches", () => {
      it("should return empty array for non-object input", () => {
        const issues: Issue[] = [
          { path: ["question"], code: "invalid", message: "Invalid" },
        ];

        const nonObjectInputs = [null, undefined, "string", 123, true, []];

        nonObjectInputs.forEach((input) => {
          const result = suggestQuizSummaryPatches(input, issues);
          expect(result).toEqual([]);
        });
      });

      it("should only suggest patches for fields mentioned in issues", () => {
        const input = {
          id: "  quiz-123  ",
          question: "  Valid question  ",
          answerType: "single",
          status: "pending",
          tagIds: null,
        };

        const issues: Issue[] = [
          { path: ["question"], code: "invalid", message: "Invalid question" },
          {
            path: ["answerType"],
            code: "invalid",
            message: "Invalid answerType",
          },
        ];

        const result = suggestQuizSummaryPatches(input, issues);

        // Should only suggest patches for question and answerType, not for id, status, or tagIds
        expect(result).toHaveLength(2);
        expect(result).toContainEqual({ question: "Valid question" });
        expect(result).toContainEqual({ answerType: "single_choice" });
      });

      it("should suggest patches for all relevant fields when issues exist", () => {
        const input = {
          id: "  quiz-123  ",
          question: "",
          explanation: "  explanation  ",
          solutionId: "  solution-456  ",
          creatorId: "  creator-789  ",
          answerType: "bool",
          status: "pending",
          tagIds: ["valid", "", " trimmed "],
          approvedAt: undefined,
        };

        const issues: Issue[] = [
          { path: ["id"], code: "invalid", message: "Invalid id" },
          { path: ["question"], code: "invalid", message: "Invalid question" },
          {
            path: ["explanation"],
            code: "invalid",
            message: "Invalid explanation",
          },
          {
            path: ["solutionId"],
            code: "invalid",
            message: "Invalid solutionId",
          },
          {
            path: ["creatorId"],
            code: "invalid",
            message: "Invalid creatorId",
          },
          {
            path: ["answerType"],
            code: "invalid",
            message: "Invalid answerType",
          },
          { path: ["status"], code: "invalid", message: "Invalid status" },
          { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
          {
            path: ["approvedAt"],
            code: "invalid",
            message: "Invalid approvedAt",
          },
        ];

        const result = suggestQuizSummaryPatches(input, issues);

        expect(result.length).toBeGreaterThan(0);

        // Check for specific patches
        const hasIdPatch = result.some(
          (patch) =>
            typeof patch === "object" &&
            "id" in patch &&
            patch.id === "quiz-123",
        );
        const hasQuestionPatch = result.some(
          (patch) =>
            typeof patch === "object" &&
            "question" in patch &&
            patch.question === "Sample question",
        );
        const hasAnswerTypePatch = result.some(
          (patch) =>
            typeof patch === "object" &&
            "answerType" in patch &&
            patch.answerType === "boolean",
        );

        expect(hasIdPatch).toBe(true);
        expect(hasQuestionPatch).toBe(true);
        expect(hasAnswerTypePatch).toBe(true);
      });

      describe("Integration with applyEntityPatches", () => {
        it("should apply multiple patches correctly", () => {
          const input = {
            id: "  quiz-123  ",
            question: "",
            answerType: "bool" as unknown as "boolean",
            status: "pending" as unknown as "pending_approval",
            tagIds: null,
            solutionId: "solution-456",
            creatorId: "creator-789",
            createdAt: "2023-12-01T10:00:00.000Z",
          };

          const issues: Issue[] = [
            { path: ["id"], code: "invalid", message: "Invalid id" },
            {
              path: ["question"],
              code: "invalid",
              message: "Invalid question",
            },
            {
              path: ["answerType"],
              code: "invalid",
              message: "Invalid answerType",
            },
            { path: ["status"], code: "invalid", message: "Invalid status" },
            { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
          ];

          const patches = suggestQuizSummaryPatches(input, issues);
          const patched: QuizSummaryInput =
            applyEntityPatches<QuizSummaryInput>(
              input,
              patches,
            ) as QuizSummaryInput;

          expect(patched.id).toBe("quiz-123");
          expect(patched.question).toBe("Sample question");
          expect(patched.answerType).toBe("boolean");
          expect(patched.status).toBe("pending_approval");
          expect(patched.tagIds).toEqual([]);
        });

        it("should handle function patches correctly", () => {
          const input = {
            tagIds: [
              "valid",
              "",
              " trimmed ",
              null,
              123,
            ] as unknown as string[],
            id: "quiz-123",
            question: "Valid question",
            answerType: "single_choice" as const,
            solutionId: "solution-456",
            status: "pending_approval" as const,
            creatorId: "creator-789",
            createdAt: "2023-12-01T10:00:00.000Z",
          };

          const issues: Issue[] = [
            { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
          ];

          const patches = suggestQuizSummaryPatches(input, issues);
          const patched: QuizSummaryInput =
            applyEntityPatches<QuizSummaryInput>(
              input,
              patches,
            ) as QuizSummaryInput;

          expect(patched.tagIds).toEqual(["valid", "trimmed"]);
        });

        it("should handle approved status patch integration", () => {
          const mockDate = "2023-12-01T10:00:00.000Z";
          vi.spyOn(Date.prototype, "toISOString").mockReturnValue(mockDate);

          const input = {
            status: "approved" as const,
            approvedAt: undefined,
            id: "quiz-123",
            question: "Valid question",
            answerType: "single_choice" as const,
            solutionId: "solution-456",
            creatorId: "creator-789",
            createdAt: "2023-12-01T10:00:00.000Z",
          };

          const issues: Issue[] = [
            { path: ["status"], code: "invalid", message: "Invalid status" },
            {
              path: ["approvedAt"],
              code: "invalid",
              message: "Invalid approvedAt",
            },
          ];

          const patches = suggestQuizSummaryPatches(input, issues);
          const patched: QuizSummaryInput =
            applyEntityPatches<QuizSummaryInput>(
              input,
              patches,
            ) as QuizSummaryInput;

          expect(patched.status).toBe("approved");
          expect(patched.approvedAt).toBe(mockDate);

          vi.restoreAllMocks();
        });
      });
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle empty issues array", () => {
      const result = suggestQuizSummaryPatches(validQuizSummaryInput, []);
      expect(result).toEqual([]);
    });

    it("should handle issues with non-string paths", () => {
      const issues: Issue[] = [
        { path: [0], code: "invalid", message: "Invalid" },
        { path: ["question", 1], code: "invalid", message: "Invalid" },
      ];

      const result = suggestQuizSummaryPatches(validQuizSummaryInput, issues);
      expect(result).toEqual([]);
    });

    it("should handle malformed input objects", () => {
      const malformedInputs = [
        { question: null, answerType: undefined, status: 123 },
        { id: [], solutionId: {}, creatorId: true },
      ];

      const issues: Issue[] = [
        { path: ["question"], code: "invalid", message: "Invalid" },
        { path: ["answerType"], code: "invalid", message: "Invalid" },
      ];

      malformedInputs.forEach((input) => {
        const result = suggestQuizSummaryPatches(input, issues);
        expect(Array.isArray(result)).toBe(true);
      });
    });

    it("should preserve original input when no patches are applicable", () => {
      const input = { ...validQuizSummaryInput };
      const issues: Issue[] = [
        { path: ["unknownField"], code: "invalid", message: "Invalid" },
      ];

      const patches = suggestQuizSummaryPatches(input, issues);
      const patched = applyEntityPatches(input, patches);

      expect(patched).toEqual(input);
    });
  });

  describe("Performance and Large Data Handling", () => {
    it("should handle large number of issues efficiently", () => {
      const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
        path: ["question"],
        code: `error-${i}`,
        message: `Error ${i}`,
      }));

      const result = suggestQuizSummaryPatches(
        {
          question: "  untrimmed  ",
        },
        largeIssues,
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ question: "untrimmed" });
    });

    it("should handle large tagIds arrays efficiently", () => {
      const largeTagIds = Array.from({ length: 1000 }, (_, i) =>
        i % 3 === 0 ? "" : i % 5 === 0 ? `  tag-${i}  ` : `tag-${i}`,
      );

      const patches = suggestTagIdsPatches(largeTagIds);
      expect(patches).toHaveLength(1);
      const patch = patches[0];
      if (!patch) throw new Error("Expected patch to exist");
      const materializedPatch = materializeEntityPatch(patch);

      expect(Array.isArray(materializedPatch.tagIds)).toBe(true);
      expect(materializedPatch.tagIds?.length).toBeLessThan(largeTagIds.length);

      // Check that empty strings were filtered out and strings were trimmed
      materializedPatch.tagIds?.forEach((tagId) => {
        expect(tagId).not.toBe("");
        expect(tagId.trim()).toBe(tagId);
      });
    });
  });
});
