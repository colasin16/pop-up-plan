import { AxiosError, AxiosRequestConfig } from "axios";
import { load } from "../utils/storage";
import { STORE_ITEMS_KEYS } from "../utils/storage/keys";
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

  protected async getConfig(): Promise<AxiosRequestConfig> {
    return {
      headers: await this.getHeaders()
    };
  }

  private async getHeaders() {
    return {
      'Authorization': `Bearer ${await this.getToken()}`
    }
  }

  private async getToken() {
    return await load(STORE_ITEMS_KEYS.TOKEN)
  }
}