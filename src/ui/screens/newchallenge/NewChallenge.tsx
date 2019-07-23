import * as React from "react";
import * as _ from "lodash";
import {NewChallengeBase} from "./NewChallengeBase";
import {observer} from "mobx-react";
import {ActivityIndicator, Modal, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {style} from "./NewChallengeStyles";
import {Datepicker} from "./components/Datepicker";
import Icon from "react-native-vector-icons/Feather";
import {AppText} from "../../components";
import {Variables} from "../../style";
import {ImagePicker} from "../../components/imagepicker";
import {AppButton, CheckBox} from "../../components";
import {Models} from "../../../core";

@observer
export class NewChallenge extends NewChallengeBase {
  render() {
    const {isEdit, updateChallengeStatus} = this;
    const {title, description, ideasDeadline, challengeDeadline, ideasEditingDeadline, challengeEditingDeadline, fileURI, privacyMode, isPickingDate, isPickingChallengeDate} = this.state;
    const {challengeState, userState} = this.dataStore;
    const {createChallengeStatus} = challengeState;
    const {currentDomain} = userState;

    return (
      <ScrollView style={style.mainContainer} keyboardShouldPersistTaps="never" contentContainerStyle={{padding: 20}}>
        <ImagePicker uri={fileURI} onChange={this.handleImagePickerChange} maxSize={512000} />

        <TextInput style={style.challengeTitle} placeholder={"What is the title of the new challenge?"} onChangeText={this.handleTitleChange} value={title} />
        <TextInput style={style.challengeDescription} placeholder={"What is the description?"} multiline={true} onChangeText={this.handleDescriptionChange} value={description} />

        <View style={style.datePickerContainer}>
          <TouchableWithoutFeedback onPress={this.handleIdeasDeadlinePress}>
            <View style={style.datePickerItem}>
              <View>
                <AppText style={{fontSize: 12, marginBottom: 8}}>Ideas deadline:</AppText>
              </View>

              <View style={{alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
                <AppText style={style.calendarText}>{!_.isNil(ideasDeadline) && ideasDeadline.format("D-MM-YYYY")}</AppText>

                {!_.isNil(ideasDeadline) ? (
                  <TouchableOpacity onPress={() => this.setState({ideasDeadline: undefined})}>
                    <Icon name="x" style={{alignSelf: "flex-end"}} size={16} />
                  </TouchableOpacity>
                ) : (
                  <Icon name="calendar" style={{alignSelf: "flex-end"}} size={16} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.handleChallengeDeadlinePress}>
            <View style={style.datePickerItem}>
              <View>
                <AppText style={{fontSize: 12, marginBottom: 8}}>Challenge deadline:</AppText>
              </View>

              <View style={{alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
                <AppText style={style.calendarText}>{!_.isNil(challengeDeadline) && challengeDeadline.format("D-MM-YYYY")}</AppText>

                {!_.isNil(challengeDeadline) ? (
                  <TouchableOpacity onPress={() => this.setState({challengeDeadline: undefined})}>
                    <Icon name="x" style={{alignSelf: "flex-end"}} size={16} />
                  </TouchableOpacity>
                ) : (
                  <Icon name={"calendar"} style={{alignSelf: "flex-end"}} size={16} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <CheckBox checked={privacyMode === Models.ChallengePrivacyMode.BYDOMAIN} title={`Private for my domain (${currentDomain})`} onPress={this.handlePrivacyModePress} wrapperStyle={{marginBottom: 20}} />

        <AppButton onPress={this.handleSubmit} style={style.createChallengeButtonContainer}>
          {isEdit ? "SAVE" : "CREATE"}
        </AppButton>

        <AppButton onPress={this.handleClear} isPrimary={false} style={{width: "100%"}}>
          CLEAR
        </AppButton>

        {isPickingDate && (
          <Datepicker
            minDate={new Date()}
            maxDate={challengeDeadline ? challengeDeadline.toDate() : undefined}
            value={ideasEditingDeadline}
            onChange={date => this.displayChosenIdeaDeadline(date)}
            onRequestClose={() => this.setState({isPickingDate: false})}
          />
        )}

        {isPickingChallengeDate && (
          <Datepicker
            value={challengeEditingDeadline}
            onChange={date => this.displayChosenChallengeDeadline(date)}
            onRequestClose={() => this.setState({isPickingChallengeDate: false})}
            minDate={ideasDeadline ? ideasDeadline.toDate() : new Date()}
          />
        )}

        {!isEdit && createChallengeStatus.isLoading && (
          <Modal presentationStyle="overFullScreen" transparent={true} animationType="slide" onRequestClose={() => {}}>
            <View style={style.modalFullScreen}>
              <AppText style={{color: Variables.whiteColor, marginBottom: 20}}>We're creating your challenge!</AppText>
              <ActivityIndicator size="large" color={Variables.whiteColor} />
            </View>
          </Modal>
        )}

        {isEdit && !_.isNil(updateChallengeStatus) && updateChallengeStatus.isLoading && (
          <Modal presentationStyle={"overFullScreen"} transparent={true} animationType={"slide"} onRequestClose={() => {}}>
            <View style={style.modalFullScreen}>
              <AppText style={{color: Variables.whiteColor, marginBottom: 20}}>We're updating your challenge!</AppText>
              <ActivityIndicator size="large" color={Variables.whiteColor} />
            </View>
          </Modal>
        )}
      </ScrollView>
    );
  }
}
