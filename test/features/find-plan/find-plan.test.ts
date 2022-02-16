import { Category } from "../../../src/core/domain/plan";
import { containerDI } from "../../../src/core/infrastructure/dependency-injection/container";
import { PlanFinder } from "../../../src/features/find-plan/application/plan-finder";

describe("Plan search", () => {
  test("A plan can be found by its category", async done => {
    const categoryRun = Category.RUN;

    const planFinder = containerDI.resolve(PlanFinder);
    const { plans } = await planFinder.findByCategory(categoryRun);

    expect(plans.length).toBeGreaterThan(0);
    expect(plans[0].category).toBe(categoryRun);

    done();
  }, 240000);
});
