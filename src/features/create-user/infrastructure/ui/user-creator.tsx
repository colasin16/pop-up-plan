import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { ViewStyle, TextStyle, Platform, View } from "react-native";

import { spacing, color } from "../../../../../app/theme";
import { UserCreator } from "../../application/user-creator";
import { UserCreationData } from "../../domain/user-creation-data";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { Button, TextField, Text } from "../../../../../app/components";
import { PhoneNumber } from "../../../../core/domain/types/phone-number";
import { Email } from "../../../../core/domain/types/email";
import { Password } from "../../../../core/domain/types/password";
import { ValidationError } from "../../../../core/domain/exceptions";
import { useStores } from "../../../../../app/models";
import { ToastPIC } from "../../../../../app/utils/toast";

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

export const CreateUser: FC<Props> = observer(({ onFinish }: Props) => {
  const store = useStores();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState<Email>("");
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>();
  const [newPassword, setNewPassword] = useState<Password>();
  const [newPasswordAgain, setNewPasswordAgain] = useState<Password>();

  const isReadyToSubmit = () => {
    return (
      !!firstName && !!lastName && !!email && !!phoneNumber && !!newPassword && newPasswordAgain
    );
  };

  const validateForm = () => {
    if (newPassword !== newPasswordAgain) {
      const errorMessage = "Passwords do not match"
      console.error(errorMessage);
      ToastPIC.show(errorMessage)
      throw new ValidationError("Passwords do not match"); // TODO: think about it
    }
  };

  const submit = async (): Promise<void> => {
    const userCreator = containerDI.resolve(UserCreator);
    try {
      validateForm();

    } catch (error) {
      return
    }

    if (isReadyToSubmit()) {
      const userData: UserCreationData = {
        name: { firstName: firstName, lastName: lastName },
        email,
        phoneNumber,
        password: newPassword,
      };

      try {
        const { data } = await userCreator.create(userData);
        // TODO: Get user

        console.debug(`user with id '${data["id"]}' has been created!`);

        // after register a new user, it automatically logs in
        store.setUser({
          ...data,
          image: "",
        });

        // TODO: check how can we validate that the user has been created successfully

        onFinish();
      } catch (error) {
        console.log("🚀 ~ file: user-creator.tsx ~ line 101 ~ submit ~ error", error);
      }
    }
  };

  return (
    <View>
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setFirstName(value)}
        value={firstName}
        label="Name"
        placeholder="Enter your name"
      />
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setLastName(value)}
        value={lastName}
        label="Last Name"
        placeholder="Enter your last name"
      />
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setEmail(value)}
        value={email}
        label="Email"
        placeholder="Enter your email"
      />
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setPhoneNumber(value)}
        value={phoneNumber}
        label="Phone Number"
        placeholder="Enter your phone number"
      />
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setNewPassword(value)}
        value={newPassword}
        label="Password"
        placeholder="Enter your new password"
      />
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setNewPasswordAgain(value)}
        value={newPasswordAgain}
        label="Password"
        placeholder="Enter your new password again"
      />

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
