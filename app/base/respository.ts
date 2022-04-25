import { AxiosError } from "axios";
import { ToastPIC } from "../utils/toast";

export class Repository {
  protected handleAxiosError(err: AxiosError) {
    console.debug(`Error during sending data to server.., ${err.message}`);

    if (err.response) {
      console.debug(err.response.status);
      console.debug(err.response.data);
      ToastPIC.showAxiosError(err)
    }
  }
}