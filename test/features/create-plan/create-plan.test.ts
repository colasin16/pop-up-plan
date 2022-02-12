import { containerDI } from "../../../src/core/dependency-injection/container";
import { Category, Privacy } from "../../../src/core/shared/domain/plan";
import { User } from "../../../src/core/shared/domain/user";
import { PlanCreator } from "../../../src/features/create-plan/application/plan-creator";
import { PlanCreationData } from "../../../src/features/create-plan/domain/plan-creation-data";

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
    const createdPlan = await planCreator.create(currentUser, newPlan);

    expect(createdPlan.id).toBeDefined();
    expect(createdPlan.owner.id).toBe(currentUser.id);
    expect(createdPlan.title).toBe(newPlan.title);
    expect(createdPlan.privacy).toBe(newPlan.privacy);
    expect(createdPlan.category).toBe(newPlan.category);
    expect(createdPlan.location).toBe(newPlan.location);
    expect(createdPlan.time).toBe(planTime);
    expect(createdPlan.chat).toBeDefined();
    expect(createdPlan.atendees).toBeDefined();

    done();
  }, 240000);
});
