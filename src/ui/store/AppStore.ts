import * as _ from "lodash";
import {DataStore} from "../../core";
import {StorageState} from "./StorageState";
import {NavigationState} from "./NavigationState";
import {SignInRequest, SignInStatus} from "../../core/store/UserState";
import {autorun} from "mobx";

export class AppStore {
  public dataStore = new DataStore();

  public storageState = new StorageState(this);
  public navigationState = new NavigationState(this);

  protected tokensChangeListener: () => void | undefined;

  private static INSTANCE: AppStore;

  constructor() {
    if (_.isNil(AppStore.INSTANCE)) AppStore.INSTANCE = this;

    return AppStore.INSTANCE;
  }

  public listenTokensChange() {
    if (this.tokensChangeListener) this.tokensChangeListener();
    this.tokensChangeListener = autorun(() => this.handleTokensChange());
  }

  protected handleTokensChange() {
    const {dataStore, storageState} = this;
    const {authToken, refreshToken} = dataStore.userState;

    if (authToken) storageState.setAuthToken(authToken);
    else storageState.deleteAuthToken();

    if (refreshToken) storageState.setRefreshToken(refreshToken);
    else storageState.deleteRefreshToken();
  }

  public signIn = async (request: SignInRequest): Promise<SignInStatus> => {
    const {dataStore} = this;
    const {userState} = dataStore;

    const signInResponse = await userState.signIn(request);

    if (signInResponse.success && !_.isNil(userState.authToken)) {
      const fetchMeResponse = await userState.fetchMe();

      if (!fetchMeResponse.success) {
        signInResponse.success = false;
        signInResponse.errors = {code: "GENERIC_ERROR", message: "There was an error trying to log in. Please try again."};
      }
    }

    return signInResponse;
  };

  public signOut = async (): Promise<void> => {
    const {navigationState} = this;

    this.dataStore.signOut();
    navigationState.navigateToAuthCheck();
  };
}
