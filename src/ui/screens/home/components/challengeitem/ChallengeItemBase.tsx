import {Models} from "../../../../../core";
import {BaseComponent, BaseComponentProps, BaseComponentState} from "../../../../BaseComponent";

export interface ChallengeItemProps extends BaseComponentProps {
  challenge: Models.Challenge;
}

export interface ChallengeItemState extends BaseComponentState {}

export abstract class ChallengeItemBase extends BaseComponent<ChallengeItemProps, ChallengeItemState> {
  protected isNavigating = false;

  protected onAddIdeaPress = () => {
    const {challenge} = this.props;
    const {navigationState} = this.appStore;
    const {isAuthenticated} = this.dataStore.userState;

    if (this.isNavigating) return;

    this.isNavigating = true;

    if (isAuthenticated) navigationState.navigateToNewIdea({challenge});
    else
      navigationState.navigateToSignIn({
        onSuccess: () => {
          navigationState.navigateToHome();
          navigationState.navigateToNewIdea({challenge});
        },
      });
  };

  protected handlePageBlur = () => {
    this.isNavigating = false;
  };

  protected onViewAllPress = () => {
    this.appStore.navigationState.navigateToChallengeDetail(this.props.challenge);
  };
}
