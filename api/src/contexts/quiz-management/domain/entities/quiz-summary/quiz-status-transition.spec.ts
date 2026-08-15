import { describe, expect, it } from "vitest";
import {
  canDeleteStatus,
  canTransition,
  canUpdateStatus,
  DELETABLE_STATUSES,
  QUIZ_STATUS_TRANSITIONS,
  QUIZ_STATUS_VALUES,
  QUIZ_TRANSITION_ACTIONS,
  type QuizStatusValue,
  type QuizTransitionAction,
  transitionRuleOf,
  UPDATABLE_STATUSES,
} from "./quiz-status-transition";

describe("quiz-status-transition", () => {
  describe("canTransition", () => {
    const expected: Record<
      QuizTransitionAction,
      Record<QuizStatusValue, boolean>
    > = {
      submit: {
        draft: true,
        pending_approval: false,
        approved: false,
        rejected: true,
        published: false,
      },
      approve: {
        draft: false,
        pending_approval: true,
        approved: false,
        rejected: false,
        published: false,
      },
      reject: {
        draft: false,
        pending_approval: true,
        approved: false,
        rejected: false,
        published: false,
      },
      publish: {
        draft: false,
        pending_approval: false,
        approved: true,
        rejected: false,
        published: false,
      },
    };

    for (const action of QUIZ_TRANSITION_ACTIONS) {
      for (const status of QUIZ_STATUS_VALUES) {
        it(`${action} from ${status} は ${expected[action][status]}`, () => {
          expect(canTransition(status, action)).toBe(expected[action][status]);
        });
      }
    }
  });

  describe("transitionRuleOf", () => {
    it.each([
      ["submit", "pending_approval", false, false],
      ["approve", "approved", true, true],
      ["reject", "rejected", true, false],
      ["publish", "published", true, false],
    ] satisfies [QuizTransitionAction, QuizStatusValue, boolean, boolean][])(
      "%s のルールは to=%s, requiresModeration=%s, stampsApprovedAt=%s",
      (action, to, requiresModeration, stampsApprovedAt) => {
        const rule = transitionRuleOf(action);
        expect(rule.to).toBe(to);
        expect(rule.requiresModeration).toBe(requiresModeration);
        expect(rule.stampsApprovedAt).toBe(stampsApprovedAt);
      },
    );

    it("submitはdraftとrejectedの両方から遷移可能", () => {
      expect(transitionRuleOf("submit").from).toEqual(["draft", "rejected"]);
    });
  });

  describe("canUpdateStatus / canDeleteStatus", () => {
    it.each([
      ["draft", true],
      ["pending_approval", true],
      ["rejected", true],
      ["approved", false],
      ["published", false],
    ] satisfies [QuizStatusValue, boolean][])(
      "canUpdateStatus(%s) は %s",
      (status, expectedResult) => {
        expect(canUpdateStatus(status)).toBe(expectedResult);
      },
    );

    it.each([
      ["draft", true],
      ["pending_approval", true],
      ["rejected", true],
      ["approved", false],
      ["published", false],
    ] satisfies [QuizStatusValue, boolean][])(
      "canDeleteStatus(%s) は %s",
      (status, expectedResult) => {
        expect(canDeleteStatus(status)).toBe(expectedResult);
      },
    );

    it("UPDATABLE_STATUSESとDELETABLE_STATUSESは同一集合", () => {
      expect([...UPDATABLE_STATUSES].sort()).toEqual(
        [...DELETABLE_STATUSES].sort(),
      );
    });
  });

  describe("QUIZ_STATUS_TRANSITIONS の網羅性", () => {
    it("全アクションが定義されている", () => {
      expect(Object.keys(QUIZ_STATUS_TRANSITIONS).sort()).toEqual(
        [...QUIZ_TRANSITION_ACTIONS].sort(),
      );
    });
  });
});
