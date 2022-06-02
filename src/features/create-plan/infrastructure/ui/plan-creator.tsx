import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Platform, TextStyle, View, ViewStyle } from "react-native";
import { Button, Text, TextField } from "../../../../../app/components";
import { useStores } from "../../../../../app/models";
import { color, spacing } from "../../../../../app/theme";
import { Category, Privacy } from "../../../../core/domain/plan";
import { CustomLocation } from "../../../../core/domain/types/location";
import { Timestamp } from "../../../../core/domain/types/timestamp";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { PlanCreator } from "../../application/plan-creator";
import { PlanCreationData } from "../../domain/plan-creation-data";

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

interface Props {
  onFinish(): void;
}

export const CreatePlan: FC<Props> = observer(({ onFinish }: Props) => {
  const { userPlansStore, userStore } = useStores();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<CustomLocation>("");
  const [time, setTime] = useState<Timestamp>(0);


  // TODO: now we only have category:walk and privacy:private plans
  const [category, setCategory] = useState<Category>(Category.WALK);
  const [privacy, setPrivacy] = useState<Privacy>(Privacy.PRIVATE);

  const isReadyToSubmit = () => {
    return !!title && !!location && !!time && !!category && !!privacy;
  };

  const submit = async (): Promise<void> => {
    console.debug("submit")
    const planCreator = containerDI.resolve(PlanCreator);

    if (isReadyToSubmit()) {
      console.debug("submitting")

      const loggedInUserId = userStore.id;
      const planData: PlanCreationData = {
        ownerId: loggedInUserId,
        title,
        location,
        time,
        category,
        description,
        privacy,
      };

      try {
        // TODO: if PlanCreatorRepository returns plan obj instead of planId
        // The three following lines will be converted to this:
        // const { plan } = await planCreator.create(user, planData);
        const { data } = await planCreator.create(planData);
        if (data) {
          // TODO: everytime when a plan is created, fetch all the plans from server again,
          // maybe other users added a plan and we need to have them?
          // or we can have a refresh mechanism (auto or manual)
          userPlansStore.savePlans([...userPlansStore.plans, data]);
        }
        onFinish();
      } catch (error) {
        console.log("🚀 ~ file: plan-creator.tsx ~ line 77 ~ submit ~ error", error);
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

      {/*       
      <View>
        
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
      </View> */}

      <View>
        <Button
          disabled={!isReadyToSubmit()}
          style={DEMO}
          textStyle={DEMO_TEXT}
          text="HC Submit"
          onPress={submit}
        />
        {/* <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} /> */}
      </View>
    </View>
  );
});
