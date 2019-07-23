import * as _ from "lodash";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import {ReactNativeFile} from "apollo-upload-client";
import {Alert} from "react-native";
import * as Models from "../../../core/models";
import {action, observable} from "mobx";
import {UpdateIdeaStatus} from "../../../core/store/IdeaState";
import {Variables} from "../../style";
import {ImagePickerInfo} from "../../components";

export interface NewIdeaProps extends BaseScreenProps {}

export interface NewIdeaState extends BaseScreenState {
  title: string;
  description: string;

  fileURI: string | undefined;
  fileName: string | undefined;
  fileType: string | undefined;

  isLoadingInitialData: boolean;
}

export abstract class NewIdeaBase extends BaseScreen<NewIdeaProps, NewIdeaState> {
  protected idea: Models.Idea;
  protected isEdit: boolean = false;

  @observable
  protected updateIdeaStatus: UpdateIdeaStatus | undefined;

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
      headerBackTitle: null,
    };
  };

  constructor(props: NewIdeaProps) {
    super(props);

    const {navigation} = this.props;
    this.idea = navigation.getParam("idea");
    this.isEdit = !_.isNil(this.idea);
  }

  public async componentDidMount() {
    const {idea, isEdit, dataStore} = this;
    const {navigation} = this.props;
    const {ideaState} = dataStore;

    navigation.setParams({title: this.isEdit ? "EDIT IDEA" : "NEW IDEA"});

    if (isEdit) {
      this.setState({isLoadingInitialData: true});

      const response = await ideaState.fetchIdea({id: idea.id});

      if (response.success && !_.isNil(response.idea)) {
        const {title, description, imageUrl} = response.idea;

        this.setState({
          title,
          description,
          fileURI: imageUrl,
          isLoadingInitialData: false,
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
  protected setUpdateIdeaStatus(status: UpdateIdeaStatus) {
    this.updateIdeaStatus = status;
  }

  protected handleImagePickerChange = (info: ImagePickerInfo | null) => {
    if (info !== null) {
      const {fileURI, fileName, fileType} = info;

      this.setState({fileURI, fileType, fileName});
    } else this.setState({fileURI: undefined, fileType: undefined, fileName: undefined});
  };

  protected handleTitleChange = (title: string) => this.setState({title});

  protected handleDescriptionChange = (description: string) => this.setState({description});

  protected handleCreatePress = () => {
    const {ideaState, challengeState} = this.dataStore;
    const {navigationState} = this.appStore;

    if (!this.hasError() && (this.isEdit || !_.isNil(challengeState.currentChallenge))) {
      const {title, description, fileURI, fileName, fileType} = this.state;

      if (this.isEdit) {
        const {idea} = this;

        const image =
          !_.isNil(fileURI) && fileURI !== idea.imageUrl
            ? new ReactNativeFile({
                uri: fileURI,
                name: fileName!,
                type: fileType!,
              })
            : undefined;

        this.setUpdateIdeaStatus({isLoading: true});
        ideaState
          .updateIdea({
            idea,
            title,
            description,
            image,
          })
          .then(response => {
            this.setUpdateIdeaStatus(response);

            if (response.success) {
              this.resetState();
              setTimeout(navigationState.goBack, 600);
            } else setTimeout(() => this.showAlert("Error", "There was an error saving your idea. Please try again later."), 600);
          });
      } else {
        const image = !_.isNil(fileURI)
          ? new ReactNativeFile({
              uri: fileURI,
              name: fileName!,
              type: fileType!,
            })
          : undefined;

        ideaState
          .createIdea({
            title,
            description,
            challenge: challengeState.currentChallenge!,
            image,
          })
          .then(result => {
            if (result.success) {
              this.resetState();
              this.dataStore.challengeState.fetchChallengeList();
              this.appStore.navigationState.goBack();
            } else setTimeout(() => this.showAlert("Error", "There was an error creating your idea. Please try again later."), 600);
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

  private hasError = (): boolean => {
    const {title, description, fileURI} = this.state;

    return ![title, description, fileURI].every(field => !_.isNil(field)) || (title.trim().length === 0 && description.trim().length === 0);
  };

  private resetState = () => {
    this.setState({
      title: "",
      description: "",
      fileURI: undefined,
    });
  };
}
