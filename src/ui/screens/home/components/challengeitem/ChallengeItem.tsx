import * as React from "react";
import * as _ from "lodash";
import {ChallengeItemBase} from "./ChallengeItemBase";
import {observer} from "mobx-react";
import {style} from "./ChallengeItemStyles";
import {FlatList, Image, TouchableOpacity, View} from "react-native";
import {ChallengeIdeaItem} from "../challengeideaitem/ChallengeIdeaItem";
import {AppText} from "../../../../components";
import moment from "moment";
import {AppButton} from "../../../../components";
import {NavigationEvents} from "react-navigation";

@observer
export class ChallengeItem extends ChallengeItemBase {
  protected handlePress = () => {
    const {challenge} = this.props;
    const {navigationState} = this.appStore;

    navigationState.navigateToChallengeDetail(challenge);
  };

  render() {
    const {challenge} = this.props;

    const dateToCompare = _.isNil(challenge.closeDate) ? challenge.endDate : challenge.closeDate;
    const showAddIdea =
      _.isNil(dateToCompare) ||
      dateToCompare
        .clone()
        .endOf("day")
        .isSameOrAfter(moment());

    return (
      <>
        <NavigationEvents onDidBlur={this.handlePageBlur} />

        <View style={style.container}>
          <TouchableOpacity onPress={this.handlePress}>
            <View style={style.challengeInfoContainer}>
              <Image source={{uri: challenge.imageUrl}} style={style.challengeImage as any} />

              <AppText style={style.challengeTitle} numberOfLines={1}>
                {challenge.title}
              </AppText>
              <AppText style={style.challengeDescription} numberOfLines={2}>
                {challenge.description}
              </AppText>
            </View>
          </TouchableOpacity>

          <FlatList
            data={challenge.ideas}
            renderItem={listItem => <ChallengeIdeaItem idea={listItem.item} />}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={style.ideaListSeparator} />}
            style={style.ideaList}
            contentContainerStyle={style.ideaListContentContainer}
          />

          <View style={style.buttonsContainer}>
            <AppButton onPress={this.onViewAllPress} isPrimary={false}>
              SEE MORE
            </AppButton>

            {showAddIdea && <AppButton onPress={this.onAddIdeaPress}>ADD IDEA</AppButton>}
          </View>
        </View>
      </>
    );
  }
}
