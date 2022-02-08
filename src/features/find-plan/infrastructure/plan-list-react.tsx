import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button } from "../../../../app/components";
import { container } from "../../../core/dependency-injection/container";
import { Category, Plan } from "../../../core/shared/domain/plan";
import { PlanFinder } from "../application/plan-finder";
import { Section } from "./ui/section";

interface PlanListProps {}

const PlanList = (props: PlanListProps) => {
  const [planList, setPlanList] = useState<Plan[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const planFinder = container.resolve(PlanFinder);
    const allPlans = await planFinder.findAll();
    console.log(allPlans);
    setPlanList(allPlans);
  };

  const findWalkPlans = async (): Promise<void> => {
    const planFinder = container.resolve(PlanFinder);
    const walkPlans = await planFinder.findByCategory(Category.WALK);

    setPlanList(walkPlans);
  };

  return (
    <>
      <Button text="Find Walk Plans" onPress={findWalkPlans} />
      <ScrollView>
        {planList.map(item => {
          return (
            <Section title={item.title} key={item.id}>
              The plan is a <Text style={styles.highlight}>{item.category}</Text> at{" "}
              <Text style={styles.highlight}>{item.location}</Text> around{" "}
              <Text style={styles.highlight}>{new Date(item.time).toLocaleDateString()}</Text>.
            </Section>
          );
        })}
      </ScrollView>
    </>
  );
};

export default PlanList;

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
});
