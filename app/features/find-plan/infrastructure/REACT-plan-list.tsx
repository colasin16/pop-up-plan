import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "../../../components";
import { Category, Plan } from "../../../core/shared/domain/plan";
import { PersistedObject } from "../../../core/types/persisted-object";
import { PlanFinder } from "../application/plan-finder";
import { PlanListHttpRepository } from "./plan-list-http-repository";
import { Section } from "./ui/section";

interface PlanListProps {}

const PlanList = (props: PlanListProps) => {
  const [planList, setPlanList] = useState<PersistedObject<Plan>[]>([]);

  const findAll = async (): Promise<void> => {
    const planFinder = new PlanFinder(new PlanListHttpRepository());
    const allPlans = await planFinder.findAll();

    setPlanList(allPlans);
  };

  const findWalkPlans = async (): Promise<void> => {
    const planFinder = new PlanFinder(new PlanListHttpRepository());
    const walkPlans = await planFinder.findByCategory(Category.WALK);

    setPlanList(walkPlans);
  };

  React.useMemo(() => {
    findAll();
  }, []);

  return (
    <>
      <Button text="Find Walk Plans" onPress={findWalkPlans} />
      {planList.map(plan => (
        <Section title={plan.title} key={plan.id}>
          The plan is a <Text style={styles.highlight}>{plan.category}</Text> at{" "}
          <Text style={styles.highlight}>{plan.location.address}</Text> around{" "}
          <Text style={styles.highlight}>{new Date(plan.time).toLocaleDateString()}</Text>.
        </Section>
      ))}
    </>
  );
};

export default PlanList;

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
});
