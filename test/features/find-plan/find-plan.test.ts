import { containerDI } from "../../../src/core/dependency-injection/container";
import { Category } from "../../../src/core/shared/domain/plan";
import { PlanFinder } from "../../../src/features/find-plan/application/plan-finder";

describe("Unit testing", () => {
  describe("PlanFinder", () => {
    test("A plan can be found by its category", async done => {
      const categoryRun = Category.RUN;

      const planFinder = containerDI.resolve(PlanFinder);
      const runPlan = await planFinder.findByCategory(categoryRun);

      expect(runPlan.length).toBeGreaterThan(0);
      expect(runPlan[0].category).toBe(categoryRun);

      done();
    }, 240000);
  });
});
