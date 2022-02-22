import { Privacy, Category } from "../../../src/core/domain/plan";
import { User } from "../../../src/core/domain/user";
import { containerDI } from "../../../src/core/infrastructure/dependency-injection/container";
import { PlanCreator } from "../../../src/features/create-plan/application/plan-creator";
import { PlanCreationData } from "../../../src/features/create-plan/domain/plan-creation-data";
import { PlanFinder } from "../../../src/features/find-plan/application/plan-finder";

describe("Plan creation", () => {
  test("A plan can be created", async done => {
    const currentUser: User = {
      id: `${new Date().valueOf()}`,
      name: { firstName: "Andre", lastName: "Benelli" },
    };

    const planTime = new Date().valueOf();
    const newPlan: PlanCreationData = {
      owner: currentUser,
      title: "A boring walk",
      location: "Barcelona",
      time: planTime,
      privacy: Privacy.PUBLIC,
      category: Category.WALK,
    };

    const planCreator = containerDI.resolve(PlanCreator);
    const planFinder = containerDI.resolve(PlanFinder);
    const { planId } = await planCreator.create(currentUser, newPlan);
    const { plans } = await planFinder.findAll();
    const createdPlan = plans.find(p => p.id === planId);

    expect(createdPlan.id).toBeDefined();
    expect(createdPlan.owner.id).toBe(currentUser.id);
    expect(createdPlan.title).toBe(newPlan.title);
    expect(createdPlan.privacy).toBe(newPlan.privacy);
    expect(createdPlan.category).toBe(newPlan.category);
    expect(createdPlan.location).toBe(newPlan.location);
    expect(createdPlan.time).toBe(planTime);
    // expect(createdPlan.chat).toBeDefined();
    expect(createdPlan.attendees).toBeDefined();

    done();
  }, 240000);
});
