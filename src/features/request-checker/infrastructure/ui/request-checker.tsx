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
  const goBack = () => props.navigation.goBack();

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
    console.log("useeffect")
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
        {ownedPlans?.map(plan => {
          return (
            <>
              {
                plan.pendingAttendeesId.length > 0 && <Section title={plan.title} key={plan.id}>
                  {
                    plan.pendingAttendeesId.map(requesterUser => {
                      return (
                        <View key={plan.id}>
                          <Text style={styles.highlight}>The user {requesterUser} asks to join.</Text>

                          <View style={styles.container}>
                            {/* <View style={styles.square} />
                        <View style={styles.square} />
                        <View style={styles.square} /> */}
                            <Button
                              testID="next-screen-button-5"
                              style={{ ...CONTINUE, ...styles.square }}
                              textStyle={CONTINUE_TEXT}
                              text="ACCEPT"
                              // ref: https://reactnavigation.org/docs/params/
                              onPress={async () => {
                                await planAccepterOrRejecter.acceptOrReject(plan.id, requesterUser, JoinPlanRequestStatus.ACCEPT)
                                goBack()
                              }
                              }
                            />
                            <Button
                              testID="next-screen-button-5"
                              style={{ ...CONTINUE, ...styles.square }}
                              textStyle={CONTINUE_TEXT}
                              text="REJECT"
                              // ref: https://reactnavigation.org/docs/params/
                              onPress={async () => {
                                await planAccepterOrRejecter.acceptOrReject(plan.id, requesterUser, JoinPlanRequestStatus.REJECT)
                                goBack()
                              }
                              }
                            />
                          </View>

                        </View>
                      )
                    })
                  }

                </Section>
              }
            </>

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
  container: {
    // backgroundColor: "#7CA1B4",
    flex: 1,
    alignItems: "center", // ignore this - we'll come back to it
    justifyContent: "center", // ignore this - we'll come back to it
    flexDirection: "row",
  },
  square: {
    // backgroundColor: "#7cb48f",
    margin: 4,
  },
});

