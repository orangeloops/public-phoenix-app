import * as _ from "lodash";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import moment from "moment";
import {ReactNativeFile} from "apollo-upload-client";
import {Alert} from "react-native";
import * as Models from "../../../core/models";
import {action, observable} from "mobx";
import {UpdateChallengeStatus} from "core/store/ChallengeState";
import {Variables} from "../../style";
import {ImagePickerInfo} from "../../components";

export interface NewChallengeProps extends BaseScreenProps {}

export interface NewChallengeState extends BaseScreenState {
  title: string;
  description: string;
  ideasDeadline: moment.Moment | undefined;
  challengeDeadline: moment.Moment | undefined;
  privacyMode: Models.ChallengePrivacyMode;

  ideasEditingDeadline: Date;
  challengeEditingDeadline: Date;

  isPickingDate: boolean;
  isPickingChallengeDate: boolean;

  isTakingPhoto: boolean;

  fileURI: string | undefined;
  fileName: string | undefined;
  fileType: string | undefined;

  isLoadingInitialData: boolean;
}

export abstract class NewChallengeBase extends BaseScreen<NewChallengeProps, NewChallengeState> {
  protected challenge: Models.Challenge;
  protected isEdit: boolean = false;

  @observable
  protected updateChallengeStatus: UpdateChallengeStatus | undefined;

  public static navigationOptions = ({navigation}: any) => {
    let {params} = navigation.state;

    if (_.isNil(params)) params = {};

    return {
      headerTitle: params.title ? params.title : "",
      headerTitleStyle: {
        color: Variables.whiteColor,
        fontSize: 20,
      },
      headerTintColor: Variables.whiteColor,
      headerStyle: {
        paddingTop: 10,
        backgroundColor: Variables.primaryColor,
      },
    };
  };

  constructor(props: NewChallengeProps) {
    super(props);

    const challengeDeadline = moment().add(1, "month");
    this.state = {
      ...this.state,
      ideasEditingDeadline: new Date(),
      challengeDeadline,
      challengeEditingDeadline: challengeDeadline.toDate(),
      privacyMode: Models.ChallengePrivacyMode.PUBLIC,
    };

    const {navigation} = this.props;
    this.challenge = navigation.getParam("challenge");
    this.isEdit = !_.isNil(this.challenge);
  }

  public async componentDidMount() {
    const {challenge, dataStore} = this;
    const {navigation} = this.props;
    const {challengeState} = dataStore;

    navigation.setParams({title: this.isEdit ? "EDIT CHALLENGE" : "NEW CHALLENGE"});

    if (this.isEdit) {
      this.setState({isLoadingInitialData: true});

      const response = await challengeState.fetchChallenge({id: challenge.id});

      if (response.success && !_.isNil(response.challenge)) {
        const {title, description, endDate, closeDate, imageUrl} = response.challenge;

        this.setState({
          title,
          description,
          challengeDeadline: endDate,
          ideasDeadline: closeDate,
          fileURI: imageUrl,
          privacyMode: response.challenge.privacyMode,
        });
      } else {
        // TODO-SG: handle error

        this.setState({
          isLoadingInitialData: false,
        });
      }
    }
  }

  @action
  protected setUpdateChallengeStatus(status: UpdateChallengeStatus) {
    this.updateChallengeStatus = status;
  }

  protected handleTitleChange = (title: string) => this.setState({title});

  protected handleDescriptionChange = (description: string) => this.setState({description});

  protected handleSubmit = () => {
    const {challengeState} = this.dataStore;
    const {navigationState} = this.appStore;

    if (!this.hasError()) {
      const {title, description, challengeDeadline, ideasDeadline, fileURI, fileName, fileType, privacyMode} = this.state;

      if (this.isEdit) {
        const {challenge} = this;

        const image =
          !_.isNil(fileURI) && fileURI !== challenge.imageUrl
            ? new ReactNativeFile({
                uri: fileURI,
                name: fileName!,
                type: fileType!,
              })
            : undefined;

        this.setUpdateChallengeStatus({isLoading: true});
        challengeState
          .updateChallenge({
            challenge,
            title,
            description,
            closeDate: !_.isNil(ideasDeadline) ? moment(ideasDeadline) : undefined,
            endDate: !_.isNil(challengeDeadline) ? moment(challengeDeadline) : undefined,
            image,
            privacyMode,
          })
          .then(result => {
            this.setUpdateChallengeStatus(result);

            if (result.success) {
              this.resetState();
              setTimeout(navigationState.goBack, 600);
            } else setTimeout(() => this.showAlert("Error", "There was an error saving your challenge. Please try again later."), 600);
          });
      } else {
        const image = !_.isNil(fileURI)
          ? new ReactNativeFile({
              uri: fileURI,
              name: fileName!,
              type: fileType!,
            })
          : undefined;

        challengeState
          .createChallenge({
            title,
            description,
            closeDate: !_.isNil(ideasDeadline) ? moment(ideasDeadline) : undefined,
            endDate: !_.isNil(challengeDeadline) ? moment(challengeDeadline) : undefined,
            image,
            privacyMode,
          })
          .then(result => {
            if (result.success) {
              this.resetState();
              navigationState.goBack();
            } else setTimeout(() => this.showAlert("Error", "There was an error creating your challenge. Please try again later."), 600);
          });
      }
    } else {
      this.showAlert("Error", "Data is missing");
    }
  };

  protected handleClear = () => {
    this.resetState();
  };

  private showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  private resetState = () => {
    this.setState({
      title: "",
      description: "",
      challengeDeadline: undefined,
      ideasDeadline: undefined,
      fileURI: undefined,
      privacyMode: Models.ChallengePrivacyMode.PUBLIC,
    });
  };

  private hasError = (): boolean => {
    const {title, description, fileURI} = this.state;

    return ![title, description, fileURI].every(field => !_.isNil(field)) || title.trim().length === 0 || description.trim().length === 0;
  };

  protected handleIdeasDeadlinePress = () => {
    this.setState({isPickingDate: true});
  };

  protected displayChosenChallengeDeadline = (challengeDeadline: Date) =>
    this.setState({
      challengeDeadline: moment(challengeDeadline),
      challengeEditingDeadline: challengeDeadline,
    });

  protected displayChosenIdeaDeadline = (ideasDeadline: Date) =>
    this.setState({
      ideasDeadline: moment(ideasDeadline),
      ideasEditingDeadline: ideasDeadline,
    });

  protected handleChallengeDeadlinePress = () => this.setState({isPickingChallengeDate: true});

  protected handleImagePickerChange = (info: ImagePickerInfo | null) => {
    if (info !== null) {
      const {fileURI, fileName, fileType} = info;

      this.setState({fileURI, fileType, fileName});
    } else this.setState({fileURI: undefined, fileType: undefined, fileName: undefined});
  };

  protected handlePrivacyModePress = () => {
    this.setState(prevState => ({
      privacyMode: prevState.privacyMode === Models.ChallengePrivacyMode.PUBLIC ? Models.ChallengePrivacyMode.BYDOMAIN : Models.ChallengePrivacyMode.PUBLIC,
    }));
  };
}
