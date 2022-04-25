import { AxiosError } from "axios";
import Toast from "react-native-root-toast";

export class ToastPIC{
    public static show(message:string):any{
        // Add a Toast on screen.
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
          // calls on toast\`s appear animation start
        },
        onShown: () => {
          // calls on toast\`s appear animation end.
        },
        onHide: () => {
          // calls on toast\`s hide animation start.
        },
        onHidden: () => {
          // calls on toast\`s hide animation end.
        }
      });
      return toast;
    }

    public static showAxiosError(err: AxiosError):any{
        this.show(`${err.response.status}: ${err.response.data["errors"]}`)
    }
}