import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Button } from "../../../../../app/components";
import { useStores } from "../../../../../app/models";
import { color, spacing, typography } from "../../../../../app/theme";
import { Plan } from "../../../../core/domain/plan";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { PlanFinder } from "../../../find-plan/application/plan-finder";
import { RequestChecker } from "../../application/request-checker";
import { JoinPlanRequestStatus } from "../../domain/request-checker-repository";
import { Section } from "./section";

interface PlanListProps extends PropsWithChildren<any> {
  navigation?: any;
}

const BOLD: TextStyle = { fontWeight: "bold" };
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
};
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  marginVertical: spacing[4],
  backgroundColor: color.palette.deepPurple,
};
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
};

// const defaultPlanListProps: PlanListProps = {
//   areButtonsShown: true,
// };

// export const PlanList: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
// ({ navigation }) => {
const AcceptOrRejectJoinPlanRequest: React.FC<PlanListProps> = observer((props: PlanListProps) => {
  const { searchPlansStore, userStore } = useStores();
  const planAccepterOrRejecter = containerDI.resolve(RequestChecker);
  // const { /*searchPlansStore,*/ userStore, userPlansStore } = useStores();

  // useEffect(() => {
  //   async function getData() {
  //     const planAccepterOrRejecter = containerDI.resolve(RequestChecker);
  //     const { data: plans } = await planAccepterOrRejecter.acceptOrReject("111",JoinPlanRequestStatus.ACCEPT);
  //   }

  //   getData();
  // }, []);

  const findLoggedInUserOwnedPlans = async (): Promise<Plan[]> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const { data } = await planFinder.findByOwner(userStore);
    return data

  };

  const [ownedPlans, setownedPlans] = useState([] as Plan[])


  useEffect(() => {
    const getOwnedPlans = async () => {
      return await findLoggedInUserOwnedPlans()
    }
    getOwnedPlans().then((plans) => {
      setownedPlans(plans)

    }).catch()

  }, [])


  return (
    <>
      {/* TODO: revise this component */}
      <ScrollView>
        {ownedPlans.map(plan => {
          return (
            <Section title={plan.title} key={plan.id}>
              {
                plan.pendingAttendeesId.map(requesterUser => {
                  return (
                    <View key={plan.id}>
                      <Text style={styles.highlight}>The user {requesterUser} asks to join.</Text>

                      <View style={{ flexDirection: 'column' }}>
                        <Button
                          testID="next-screen-button-5"
                          style={{ ...CONTINUE, flex: 1 }}
                          textStyle={CONTINUE_TEXT}
                          text="ACCEPT"
                          // ref: https://reactnavigation.org/docs/params/
                          onPress={() => {
                            planAccepterOrRejecter.acceptOrReject(plan.id, requesterUser, JoinPlanRequestStatus.ACCEPT)
                          }
                          }
                        />
                        <Button
                          testID="next-screen-button-5"
                          style={{ ...CONTINUE, flex: 1 }}
                          textStyle={CONTINUE_TEXT}
                          text="REJECT"
                          // ref: https://reactnavigation.org/docs/params/
                          onPress={() => {
                            planAccepterOrRejecter.acceptOrReject(plan.id, requesterUser, JoinPlanRequestStatus.REJECT)
                          }
                          }
                        />
                      </View>
                    </View>
                  )
                })
              }

            </Section>
          );
        })}
      </ScrollView>
    </>
  );
});

// PlanList.defaultProps = defaultPlanListProps;

export default AcceptOrRejectJoinPlanRequest;

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
    color: "white"
  },
});
