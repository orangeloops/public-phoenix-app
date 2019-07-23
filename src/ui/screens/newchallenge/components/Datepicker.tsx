import * as React from "react";
import {DatepickerBase} from "./DatepickerBase";
import {observer} from "mobx-react";
import {style} from "./DatepickerStyles";
import {DatePickerIOS, Modal, Platform, TouchableOpacity, View} from "react-native";
import {AppText} from "../../../components";

@observer
export class Datepicker extends DatepickerBase {
  render() {
    const {minDate, maxDate} = this.props;
    const {editingDate} = this.state;

    return (
      Platform.OS === "ios" && (
        <Modal animationType={"slide"} visible={true} onRequestClose={this.onRequestClose} transparent={true}>
          <View style={style.container}>
            <DatePickerIOS mode={"date"} minimumDate={minDate} maximumDate={maxDate} minuteInterval={10} date={editingDate} onDateChange={date => this.handleDateChange(date)} style={{alignSelf: "stretch"}} />
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={this.onAccept} style={{marginRight: 5}}>
                <View style={style.closeModalButtonContainer}>
                  <AppText style={style.closeModalButtonText}>Done</AppText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onRequestClose} style={{marginLeft: 5}}>
                <View style={style.closeModalButtonContainer}>
                  <AppText style={style.closeModalButtonText}>Cancel</AppText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    );
  }
}
