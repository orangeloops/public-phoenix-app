import * as React from "react";
import * as _ from "lodash";
import {NewIdeaBase} from "./NewIdeaBase";
import {observer} from "mobx-react";
import {ActivityIndicator, Modal, ScrollView, TextInput, View} from "react-native";
import {style} from "./NewIdeaStyles";
import {AppText} from "../../components";
import {NavigationEvents} from "react-navigation";
import {Variables} from "../../style";
import {AppButton, ImagePicker} from "../../components";

@observer
export class NewIdea extends NewIdeaBase {
  render() {
    const {isEdit, updateIdeaStatus} = this;
    const {navigation} = this.props;
    const {challengeState, ideaState} = this.dataStore;
    const {title, description, fileURI} = this.state;

    const challenge = navigation.getParam("challenge");

    return (
      <>
        {!_.isNil(challenge) && <NavigationEvents onDidFocus={() => challengeState.setCurrentChallenge(challenge)} />}

        <ScrollView style={style.mainContainer} contentContainerStyle={style.scrollContentContainer} keyboardShouldPersistTaps="never">
          <ImagePicker uri={fileURI} onChange={this.handleImagePickerChange} maxSize={512000} />

          <TextInput style={style.ideaTitle} placeholder={"What is the title of the new idea?"} onChangeText={this.handleTitleChange} value={title} />
          <TextInput style={style.ideaDescription} placeholder={"What is the description?"} multiline={true} onChangeText={this.handleDescriptionChange} value={description} />

          <AppButton onPress={this.handleCreatePress} style={{width: "100%", marginBottom: 10}}>
            {isEdit ? "SAVE" : "CREATE"}
          </AppButton>

          <AppButton onPress={this.handleClear} isPrimary={false} style={{width: "100%"}}>
            CLEAR
          </AppButton>

          {!isEdit && ideaState.createIdeaStatus.isLoading && (
            <Modal presentationStyle={"overFullScreen"} transparent={true} animationType={"slide"} onRequestClose={() => {}}>
              <View style={style.modalFullScreen}>
                <AppText style={{color: Variables.whiteColor, marginBottom: 20}}>We're creating your idea!</AppText>
                <ActivityIndicator size="large" color={Variables.whiteColor} />
              </View>
            </Modal>
          )}

          {isEdit && !_.isNil(updateIdeaStatus) && updateIdeaStatus.isLoading && (
            <Modal presentationStyle={"overFullScreen"} transparent={true} animationType={"slide"} onRequestClose={() => {}}>
              <View style={style.modalFullScreen}>
                <AppText style={{color: Variables.whiteColor, marginBottom: 20}}>We're updating your idea!</AppText>
                <ActivityIndicator size="large" color={Variables.whiteColor} />
              </View>
            </Modal>
          )}
        </ScrollView>
      </>
    );
  }
}
