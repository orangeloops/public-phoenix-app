import {observer} from "mobx-react";
import {ActivityIndicator, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {style} from "./IdeaDetailStyles";
import * as _ from "lodash";
import {AppButton, AppText} from "../../../../components";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {rgba} from "polished";
import {IdeaDetailBase} from "./IdeaDetailBase";
import {Variables} from "../../../../style";

@observer
export class IdeaDetail extends IdeaDetailBase {
  render() {
    const {idea, style: containerStyle} = this.props;
    const {success, isLoading, isChangingValue} = this.state;
    const {navigationState} = this.appStore;

    const likedByMe = _.isNil(idea.myReaction) === isChangingValue;
    const totalReactions = !isChangingValue ? idea.reactionQuantity : likedByMe ? idea.reactionQuantity + 1 : idea.reactionQuantity - 1;

    const {createdBy} = idea;

    return (
      <View style={[style.container, containerStyle]}>
        {isLoading && (
          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading && success !== undefined && !success && (
          <View style={{padding: 15, alignItems: "center"}}>
            <AppText>Could not get idea.</AppText>
            <AppButton onPress={this.fetchIdea} style={{marginTop: 20}}>
              Try again
            </AppButton>
          </View>
        )}

        {!isLoading && (success === undefined || success) && (
          <>
            <View style={style.mainImageContainer}>
              <Image source={{uri: idea.imageUrl}} style={style.mainImage as any} />
            </View>

            <ScrollView style={style.scrollContainer} contentContainerStyle={style.scrollContentContainer}>
              <>
                <View style={{position: "relative", height: 180}}>
                  <View
                    style={{
                      position: "absolute",
                      height: 250,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <TouchableWithoutFeedback onPress={() => this.appStore.navigationState.navigateToImageViewer([{url: idea.imageUrl}])}>
                      <View style={{height: 180, flexGrow: 1}} />
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                <View style={style.createdDataContainer}>
                  <LinearGradient style={style.createdDataGradient} colors={[rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)]} />
                  {!_.isNil(createdBy) && (
                    <View style={style.createdByImageContainer}>
                      <TouchableOpacity onPress={() => navigationState.navigateToAccount(createdBy)}>
                        {!_.isNil(createdBy) && <Image source={{uri: createdBy.imageUrl}} style={style.createdByImage as any} />}
                        <View style={style.createdByImageBorder} />
                      </TouchableOpacity>
                    </View>
                  )}

                  <AppText style={style.createdByName} numberOfLines={1}>
                    {!_.isNil(createdBy) ? createdBy.name : "..."}
                  </AppText>

                  <AppText style={style.createdAt}>{moment(idea.createdDate).format("D/MM/YYYY")}</AppText>
                </View>

                <View style={style.ideaInfoContainer}>
                  <View style={style.reactionsBanner}>
                    <TouchableOpacity onPress={this.handleReactionPress}>{likedByMe ? <Icon name="heart" size={23} color={Variables.primaryColor} /> : <Icon name="heart-o" size={23} color={Variables.primaryColor} />}</TouchableOpacity>

                    <AppText style={style.reactionsText}>{totalReactions}</AppText>
                  </View>

                  <View>
                    <AppText style={style.ideaTitle}>{idea.title}</AppText>

                    <AppText style={style.ideaDescription}>{idea.description}</AppText>
                  </View>
                </View>
              </>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}
