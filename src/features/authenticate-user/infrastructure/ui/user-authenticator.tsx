import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { Button, TextField } from "../../../../../app/components";
import { useStores } from "../../../../../app/models";
import { color, spacing } from "../../../../../app/theme";
import { save as saveOnStorage } from "../../../../../app/utils/storage";
import { STORE_ITEMS_KEYS } from "../../../../../app/utils/storage/keys";
import { Email } from "../../../../core/domain/types/email";
import { Password } from "../../../../core/domain/types/password";
import { containerDI } from "../../../../core/infrastructure/dependency-injection/container";
import { UserAuthenticator } from "../../application/user-authenticator";
import { UserAuthenticationData } from "../../domain/user-login-data";

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

export const AuthenticateUser: FC<Props> = observer(({ onFinish }: Props) => {
  const store = useStores();


  const [email, setEmail] = useState<Email>("");
  const [password, setPassword] = useState<Password>();

  const isReadyToSubmit = () => {
    return !!email && !!password;
  };

  const validateForm = () => { };

  const submit = async (): Promise<void> => {
    const userAuthenticator = containerDI.resolve(UserAuthenticator);
    // const planFinder = containerDI.resolve(PlanFinder);

    validateForm();

    if (isReadyToSubmit()) {
      const authenticationData: UserAuthenticationData = {
        // TODO: maybe in future we use actual username instead of email
        username: email,
        password: password,
      };

      try {
        const { token, user } = await userAuthenticator.login(authenticationData);
        // TODO: Get user

        console.debug(`user '${email}' has been authenticated, the token is: '${token}'`);

        // after register a new user, it automatically logs in
        // TODO: change it
        store.setUser({
          ...user,
          image: "",
        });

        // TODO: add remember me checkbox
        // saveKeyChain(email, password)

        await saveOnStorage(STORE_ITEMS_KEYS.TOKEN, token)
        // TODO: check how can we validate that the user has been created successfully

        // const { plans } = await planFinder.findAll();
        // const plan = plans.find(p => p.id === userId);
        // if (plan) {
        //   userPlansStore.savePlans([...userPlansStore.plans, plan]);
        // }
        onFinish();
      } catch (error) {
        console.log("🚀 ~ file: user-creator.tsx ~ line 98 ~ submit ~ error", error);
      }
    }
  };

  return (
    <View>
      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setEmail(value)}
        value={email}
        label="Email"
        placeholder="Enter your email"
      />

      <TextField
        inputStyle={{ padding: 8, marginTop: 8 }}
        onChangeText={value => setPassword(value)}
        value={password}
        label="Password"
        placeholder="Enter your password"
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
