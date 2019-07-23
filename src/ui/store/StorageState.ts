import {AsyncStorage} from "react-native";
import {State} from "./State";

enum StorageKeys {
  AuthToken = "@ph-authToken",
  RefreshToken = "@ph-refreshToken",
}

export class StorageState extends State {
  public getAuthToken(): Promise<Partial<string | null>> {
    return AsyncStorage.getItem(StorageKeys.AuthToken);
  }

  public setAuthToken(authToken: string): Promise<void> {
    return AsyncStorage.setItem(StorageKeys.AuthToken, authToken);
  }

  public deleteAuthToken(): Promise<void> {
    return AsyncStorage.removeItem(StorageKeys.AuthToken);
  }

  public getRefreshToken(): Promise<Partial<string | null>> {
    return AsyncStorage.getItem(StorageKeys.RefreshToken);
  }

  public setRefreshToken(refreshToken: string): Promise<void> {
    return AsyncStorage.setItem(StorageKeys.RefreshToken, refreshToken);
  }

  public deleteRefreshToken(): Promise<void> {
    return AsyncStorage.removeItem(StorageKeys.RefreshToken);
  }
}
