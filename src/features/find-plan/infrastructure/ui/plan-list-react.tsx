import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, FormRow } from "../../../../../app/components";
import { useStores } from "../../../../../app/models";
import { PlanSnapshot } from "../../../../../app/models/plan/plan";
import { palette } from "../../../../../app/theme/palette";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { Category } from "../../../../core/domain/plan";
import { PlanFinder } from "../../application/plan-finder";
import { Section } from "./section";
import { User } from "../../../../core/domain/user";

interface PlanListProps extends PropsWithChildren<any> {
  areButtonsShown?: boolean;
  owner?: User;
}

const defaultPlanListProps: PlanListProps = {
  areButtonsShown: true,
};

const PlanList: React.FC<PlanListProps> = observer((props: PlanListProps) => {
  const { searchPlansStore } = useStores();

  useEffect(() => {
    async function getData() {
      const planFinder = containerDI.resolve(PlanFinder);
      const { plans } = await planFinder.findAll();
      searchPlansStore.savePlans(plans as PlanSnapshot[]);
    }

    getData();
  }, []);

  const findWalkPlans = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const { plans } = await planFinder.findByCategory(Category.WALK);
    searchPlansStore.savePlans(plans as PlanSnapshot[]);
  };

  const findRunPlans = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const { plans } = await planFinder.findByCategory(Category.RUN);
    searchPlansStore.savePlans(plans as PlanSnapshot[]);
  };

  const findRunPlansByOwner = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const { plans } = await planFinder.findByOwner(props.owner);
    searchPlansStore.savePlans(plans as PlanSnapshot[]);
  };

  const FilterButtons = ({ areButtonsShown }) => {
    console.debug(areButtonsShown);
    if (props.owner) {
      findRunPlansByOwner();
      return <></>;
    }

    if (areButtonsShown) {
      return (
        <>
          <FormRow preset={"clear"}>
            <Button
              textStyle={{ color: palette.black, fontSize: 18 }}
              text="Walk Plans"
              onPress={findWalkPlans}
            />
          </FormRow>
          <FormRow preset={"clear"}>
            <Button
              textStyle={{ color: palette.black, fontSize: 18 }}
              text="Run Plans"
              onPress={findRunPlans}
            />
          </FormRow>
        </>
      );
    }

    return <></>;
  };

  return (
    <>
      <FilterButtons areButtonsShown={props.areButtonsShown} />
      <ScrollView>
        {searchPlansStore.plans.map(item => {
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
});

PlanList.defaultProps = defaultPlanListProps;

export default PlanList;

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
});
