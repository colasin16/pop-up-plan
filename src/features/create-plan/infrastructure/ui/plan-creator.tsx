import { ObjectId } from "bson";
import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, Platform, View } from "react-native";

import { useStores } from "../../../../../app/models";
import { spacing, color } from "../../../../../app/theme";
import { CustomLocation } from "../../../../core/domain/types/location";
import { Timestamp } from "../../../../core/domain/types/timestamp";
import { PlanCreator } from "../../application/plan-creator";
import { PlanCreationData } from "../../domain/plan-creation-data";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { Button, TextField, Text } from "../../../../../app/components";
import { PlanFinder } from "../../../find-plan/application/plan-finder";
import { Category, Privacy } from "../../../../core/domain/plan";

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

const user = { id: new ObjectId().toHexString(), name: { firstName: "Jordi", lastName: "Colas" } };

interface Props {
  onFinish(): void;
}

export const CreatePlan: FC<Props> = observer(({ onFinish }: Props) => {
  const { userPlansStore } = useStores();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<CustomLocation>("");
  const [time, setTime] = useState<Timestamp>(0);
  const [category, setCategory] = useState<Category>();
  const [privacy, setPrivacy] = useState<Privacy>();

  const isReadyToSubmit = () => {
    return !!title && !!location && !!time && !!category && !!privacy;
  };

  const submit = async (): Promise<void> => {
    const planCreator = containerDI.resolve(PlanCreator);
    const planFinder = containerDI.resolve(PlanFinder);

    if (isReadyToSubmit()) {
      const planData: PlanCreationData = {
        owner: user,
        title,
        location,
        time,
        category,
        description,
        privacy,
      };

      try {
        const { planId } = await planCreator.create(user, planData);
        const { plans } = await planFinder.findAll();
        const plan = plans.find(p => p.id === planId);
        if (plan) {
          userPlansStore.savePlans([...userPlansStore.plans, plan]);
        }
        onFinish();
      } catch (error) {
        console.log("🚀 ~ file: plan-creator.tsx ~ line 72 ~ submit ~ error", error);
      }
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
        onChangeText={value => setDescription(value)}
        value={description}
        label="Description"
        placeholder="This plan will about..."
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
        <Text preset="fieldLabel">Select the plan type:</Text>
        <View style={{ flexDirection: "row" }}>
          {Object.values(Category).map((cat, index) => (
            <Button
              textStyle={{ fontSize: 16, color: color.palette.black }}
              style={{
                margin: 8,
                backgroundColor: color.palette.lighterGrey,
                borderWidth: 3,
                borderColor: category === cat ? color.palette.orange : color.palette.lighterGrey,
              }}
              onPress={() => setCategory(cat)}
              key={cat}
              text={cat}
            />
          ))}
        </View>
      </View>
      <View>
        <Text preset="fieldLabel">Select the plan privacy:</Text>
        <View style={{ flexDirection: "row" }}>
          {Object.values(Privacy).map(p => (
            <Button
              textStyle={{ fontSize: 16, color: color.palette.black }}
              style={{
                margin: 8,
                backgroundColor: color.palette.lighterGrey,
                borderWidth: 3,
                borderColor: privacy === p ? color.palette.orange : color.palette.lighterGrey,
              }}
              onPress={() => setPrivacy(p)}
              key={p}
              text={p}
            />
          ))}
        </View>
      </View>

      <View>
        <Button
          disabled={!isReadyToSubmit()}
          style={DEMO}
          textStyle={DEMO_TEXT}
          text="HC Submit"
          onPress={submit}
        />
        <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} />
      </View>
    </View>
  );
});
