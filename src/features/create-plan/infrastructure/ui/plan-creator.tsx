import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import { Category, Privacy } from "../../../../core/shared/domain/plan";
import { CustomLocation } from "../../../../core/types/location";
import { PlanCreator } from "../../application/plan-creator";
import { PlanCreationData } from "../../domain/plan-creation-data";
import { PlanCreatorHttpRepository } from "../plan-creator-http-repository";
import { savePlan } from "../state/plan-creator-state";

const user = { id: "1644013242380", name: "Jordi" };

interface PlanCreatorProps {}

const PlanCreatorScreen = (props: PlanCreatorProps) => {
  const [title, setTitle] = useState<string>();
  const [location, setLocation] = useState<CustomLocation>();
  const time = new Date().valueOf();
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
      savePlan(plan);
    }
  };

  return (
    <>
      <Text>{"Title"}</Text>
      <TextInput style={styles.textInput} onChange={e => setTitle(e.nativeEvent.text)} />
      <Text>{"Time"}</Text>
      <TextInput style={styles.textInput} />
      <Text>{"Location"}</Text>
      <TextInput
        style={styles.textInput}
        onChange={e => setLocation({ address: e.nativeEvent.text })}
      />
      <Button title="Submit" onPress={submit}></Button>
    </>
  );
};

export default PlanCreatorScreen;

const styles = StyleSheet.create({
  textInput: {
    marginTop: 32,
    paddingHorizontal: 24,
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
  },
});
