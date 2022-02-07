import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, Platform, View } from "react-native";
import { useStores } from "../../../../../app/models";
import { spacing, color } from "../../../../../app/theme";
import { Category, Privacy } from "../../../../core/shared/domain/plan";
import { CustomLocation } from "../../../../core/types/location";
import { Timestamp } from "../../../../core/types/timestamp";
import { PlanCreator } from "../../application/plan-creator";
import { PlanCreationData } from "../../domain/plan-creation-data";
import { PlanCreatorHttpRepository } from "../plan-creator-http-repository";
import { Button, TextField, Text } from "../../../../../app/components";

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

const user = { id: "1644013242380", name: { firstName: "Jordi", lastName: "Colas" } };

interface Props {
  onFinish(): void;
}

export const CreatePlan: FC<Props> = observer(({ onFinish }: Props) => {
  const { userPlansStore } = useStores();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState<CustomLocation>("");
  const [time, setTime] = useState<Timestamp>(0);
  const category = Category.RUN;
  const privacy = Privacy.PUBLIC;

  const submit = async (): Promise<void> => {
    const planCreator = new PlanCreator(new PlanCreatorHttpRepository());

    if (!!title && !!location && !!time) {
      const planData: PlanCreationData = {
        owner: user,
        title,
        location,
        time,
        category,
        privacy,
      };

      const plan = await planCreator.create(user, planData);
      userPlansStore.savePlans([...userPlansStore.plans, plan]);
      onFinish();
    }
  };

  return (
    <View>
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setTitle(value)}
        value={title}
        label="Title"
        placeholder="Plan title"
      />
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setLocation(value)}
        value={location}
        label="Location"
        placeholder="Plan location"
      />
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setTime(new Date().valueOf())}
        value={time ? `${time}` : ""}
        label="Time"
        placeholder="Plan time"
      />

      <View>
        <Button style={DEMO} textStyle={DEMO_TEXT} text="HC Submit" onPress={submit} />
        <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} />
      </View>
    </View>
  );
});
