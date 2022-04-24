import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { Button, Text } from "../../../../../app/components";
import { useStores } from "../../../../../app/models";
import { color, spacing } from "../../../../../app/theme";
import { Plan } from "../../../../core/domain/plan";
import { Id } from "../../../../core/domain/types/id";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { PlanCreator } from "../../../create-plan/application/plan-creator";
import { PlanFinder } from "../../../find-plan/application/plan-finder";
import { JoinPlanRequester } from "../../application/join-plan-requester";

const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
};
const BOLD: TextStyle = { fontWeight: "bold" };

const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
};

const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
};

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
};

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
};

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
};

const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
};

const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
};

const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
  width: 180,
  height: 100,
};

const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
};

const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
};

const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
};

interface Props {
  onFinish(): void;
  planId: Id;
}

export const enum PLAN_STATE_CHOICES {
  PENDING = "Pending",
  JOINT = "Already join",
  NOT_REQUESTED = "HC Join Request",
  LOADING = "Loading",
}


export const JoinPlanRequest: FC<Props> = observer(({ onFinish, planId }: Props) => {
  // const { searchPlansStore } = useStores();
  const { userStore, searchPlansStore } = useStores();
  const joinPlanRequester = containerDI.resolve(JoinPlanRequester);
  const planFinder = containerDI.resolve(PlanFinder);

  const [planState, setPlanState] = useState( PLAN_STATE_CHOICES.LOADING)
  const [plan, setPlan] = useState(undefined)
  // const [joinButtonTextState, setjoinButtonTextState] = useState("Loading")

  useEffect(() => {
    // TODO: remove me later
    if (!userStore || !userStore.id){
      return
    }
    
    if (planId === undefined){
      // prevent sending request when planId has not been recieved
      setPlanState(PLAN_STATE_CHOICES.NOT_REQUESTED)
      return
    }

    const fetchPlan =async () => {
      const { data } = await planFinder.get(planId);
      return data
    }

    fetchPlan().then((data)=>{
      console.debug (` plan: ${JSON.stringify(data)}`)

      setPlan(data)

      console.debug (` plan.pendingAttendeesId: ${JSON.stringify(data.pendingAttendeesId)}`)
      console.debug (` userStore.id : ${JSON.stringify(userStore.id )}`)

      if ( data.pendingAttendeesId.includes(userStore.id)){
        console.debug (`userStore.id in data.pendingAttendeesId`)
        setPlanState(PLAN_STATE_CHOICES.PENDING)
      } else if ( data.attendeesId.includes(userStore.id)){
        setPlanState(PLAN_STATE_CHOICES.JOINT)
      } else {
        setPlanState(PLAN_STATE_CHOICES.NOT_REQUESTED)
      }
    }).catch()
    
   
  }, [planId])
  

  const submit = async (): Promise<void> => {
    console.log("submit");

    try {
      // TODO: if PlanCreatorRepository returns plan obj instead of planId
      // The three following lines will be converted to this:
      // const { plan } = await planCreator.create(user, planData);
      await joinPlanRequester.join(planId, userStore.id);

      // onFinish();
    } catch (error) {
      console.log("🚀 ~ file: join-plan-requester.tsx ~ line 137 ~ submit ~ error", error);
    }
  };

  const joinButtonText = (stateOfPlan:PLAN_STATE_CHOICES) =>{
    const choics = {
      [PLAN_STATE_CHOICES.NOT_REQUESTED]: "HC Join Request",
      [PLAN_STATE_CHOICES.JOINT]: "Already joint",
      [PLAN_STATE_CHOICES.LOADING]: "Loading",
      [PLAN_STATE_CHOICES.PENDING]: "Pending",

    }

    return choics[stateOfPlan]

    // if (planState == PLAN_STATE_CHOICES.NOT_REQUESTED){
    //   return "HC Join Request"
    // }
  }

  return (
    <View>
      {
        plan  && <View>
        <Text style={TAGLINE} text={`Time is: ${plan.time}`} />
        <Text style={TAGLINE} text={`Plan ID is: ${plan.id}`} />
        <Text style={TAGLINE} text={`Category is: ${plan.category}`} />
        <Text style={TAGLINE} text={`Location is: ${plan.location}`} />

        <View>
          <Button style={DEMO} textStyle={DEMO_TEXT} text={planState} onPress={submit} 
          // disabled={!!PLAN_STATE_CHOICES.JOINT}
          />
          {/* <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} /> */}
        </View>
      </View>
      }
    </View>
    
  );
});
