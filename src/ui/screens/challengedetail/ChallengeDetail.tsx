import * as _ from "lodash";
import * as React from "react";
import {ChallengeDetailBase} from "./ChallengeDetailBase";
import {observer} from "mobx-react";
import {style} from "./ChallengeDetailStyles";
import {ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {AppText} from "../../components";
import moment from "moment";
import {NavigationEvents} from "react-navigation";
import {AppButton} from "../../components/appbutton";
import {Models} from "../../../core";
import lock from "../../assets/lock.png";

@observer
export class ChallengeDetail extends ChallengeDetailBase {
  render() {
    const {challenge, fetchChallengeIdeasStatus} = this;
    const {challengeState} = this.dataStore;
    const {navigationState} = this.appStore;

    if (!_.isNil(fetchChallengeIdeasStatus) && fetchChallengeIdeasStatus.isLoading)
      return (
        <SafeAreaView style={style.container}>
          <View style={style.mainActivityIndicatorContainer}>
            <ActivityIndicator size="large" />
          </View>
        </SafeAreaView>
      );

    if (!_.isNil(fetchChallengeIdeasStatus) && !fetchChallengeIdeasStatus.isLoading && !fetchChallengeIdeasStatus.success)
      return (
        <SafeAreaView style={style.container}>
          <View style={style.errorContent}>
            <AppText style={style.errorMessage}>Could not get the ideas for the challenge.</AppText>

            <AppButton onPress={this.fetchChallengeIdeas} icon="refresh-cw" style={style.tryAgainButton}>
              Try again
            </AppButton>
          </View>
        </SafeAreaView>
      );

    const showViewIdeas = !_.isNil(fetchChallengeIdeasStatus) && !fetchChallengeIdeasStatus.isLoading && challenge!.ideas.length > 0 && fetchChallengeIdeasStatus.success;
    const dateToCompare = _.isNil(challenge.closeDate) ? challenge.endDate : challenge.closeDate;
    const showAddIdea =
      _.isNil(dateToCompare) ||
      dateToCompare
        .clone()
        .endOf("day")
        .isSameOrAfter(moment());
    const showCloseDate = challenge && challenge.closeDate;
    const showEndDate = challenge && challenge.endDate;

    return (
      <React.Fragment>
        <NavigationEvents onDidFocus={() => challengeState.setCurrentChallenge(challenge)} onDidBlur={this.handlePageBlur} />

        <SafeAreaView style={style.container}>
          <View style={style.mainImageContainer}>
            <Image source={{uri: challenge.imageUrl}} style={style.mainImage as any} />
          </View>

          <ScrollView style={style.scrollContainer} contentContainerStyle={style.scrollContentContainer}>
            <>
              <TouchableWithoutFeedback onPress={() => this.appStore.navigationState.navigateToImageViewer([{url: challenge.imageUrl}])}>
                <View style={{height: 220}} />
              </TouchableWithoutFeedback>

              <View style={style.bottomContent}>
                <View style={style.panelContainer}>
                  <View style={style.createdDataContainer}>
                    <TouchableOpacity onPress={() => navigationState.navigateToAccount(challenge.createdBy)}>
                      <View style={style.createdByImageContainer}>
                        <Image source={{uri: challenge.createdBy.imageUrl}} style={style.createdByImage as any} />
                      </View>
                    </TouchableOpacity>

                    <AppText style={style.createdAt}>{moment(challenge.createdDate).format("D/MM/YYYY")}</AppText>
                  </View>

                  <View style={style.datesContainer}>
                    {showCloseDate && (
                      <View style={style.deadlineIdeasContainer}>
                        <AppText style={style.dateTitle} numberOfLines={1}>
                          {moment(challenge.closeDate).format("D/MM/YYYY")}
                        </AppText>

                        <AppText style={style.dateSubtitle} numberOfLines={1}>
                          Ideas deadline
                        </AppText>
                      </View>
                    )}

                    {showCloseDate && showEndDate && <View style={style.datesSeparator} />}

                    {showEndDate && (
                      <View style={style.deadlineChallengeContainer}>
                        <AppText style={style.dateTitle} numberOfLines={1}>
                          {moment(challenge.endDate).format("D/MM/YYYY")}
                        </AppText>
                        <AppText style={style.dateSubtitle} numberOfLines={1}>
                          Challenge deadline
                        </AppText>
                      </View>
                    )}
                  </View>
                </View>

                {challenge.privacyMode === Models.ChallengePrivacyMode.BYDOMAIN && (
                  <View style={style.privateDataContainer}>
                    <AppText style={style.privateDataText}>{challenge.privacyData}</AppText>

                    <Image source={lock} style={{marginLeft: 2, width: 15, height: 15}} resizeMode={"contain"} />
                  </View>
                )}

                <View style={style.titleContainer}>
                  <AppText style={style.challengeTitle}>{challenge!.title}</AppText>
                </View>

                <View style={style.descriptionContainer}>
                  <AppText style={style.challengeDescription}>{challenge!.description}</AppText>
                </View>
              </View>
            </>
          </ScrollView>

          <View style={[style.buttonsContainer, !showViewIdeas && !showAddIdea ? {height: 0} : undefined]}>
            {showViewIdeas && (
              <AppButton onPress={this.handleViewIdeas} isPrimary={false}>
                VIEW IDEAS
              </AppButton>
            )}

            {showAddIdea && <AppButton onPress={this.handleAddIdea}>ADD IDEA</AppButton>}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
