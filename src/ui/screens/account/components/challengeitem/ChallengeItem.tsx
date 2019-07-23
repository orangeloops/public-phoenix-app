import * as _ from "lodash";
import * as React from "react";
import {Alert, Image, ListRenderItemInfo, TouchableOpacity, View} from "react-native";
import {Models} from "../../../../../core";
import {style} from "./ChallengeItemStyle";
import {AppText} from "../../../../components";
import {BaseComponent} from "../../../../BaseComponent";
import {observer} from "mobx-react";
import PopoverTooltip from "react-native-popover-tooltip";
import Icon from "react-native-vector-icons/Feather";
import {NavigationEvents} from "react-navigation";
import {Variables} from "../../../../style";

export interface ChallengeItemProps {
  info: ListRenderItemInfo<Models.Challenge>;
  isMe?: boolean;
  onDelete?: () => void;
}

export interface ChallengeItemState {
  isTooltipOpen: boolean;
}

@observer
export class ChallengeItem extends BaseComponent<ChallengeItemProps, ChallengeItemState> {
  public state = {
    isTooltipOpen: false,
  };

  protected isNavigating = false;

  protected handlePageBlur = () => {
    this.isNavigating = false;
  };

  protected handlePress = () => {
    const {navigationState} = this.appStore;
    const {item: challenge} = this.props.info;

    if (this.isNavigating) return;
    this.isNavigating = true;

    navigationState.navigateToChallengeDetail(challenge);
  };

  protected handleEdit = () => {
    this.appStore.navigationState.navigateToNewChallenge(this.props.info.item);
  };

  protected handleDelete = () => {
    setTimeout(() => Alert.alert("Delete challenge", "Are you sure you want to delete this challenge?", [{text: "Yes", onPress: () => this.deleteChallenge()}, {text: "Cancel"}], {cancelable: true}), 600);
  };

  protected handleOpenTooltipMenu = () => {
    this.setState({isTooltipOpen: true});
  };

  protected handleCloseTooltipMenu = () => {
    this.setState({isTooltipOpen: false});
  };

  protected deleteChallenge = async () => {
    const {challengeState} = this.dataStore;
    const {info, onDelete} = this.props;

    await challengeState.deleteChallenge({id: info.item.id});

    if (!_.isNil(onDelete)) onDelete();
  };

  render() {
    const {isMe} = this.props;
    const {isTooltipOpen} = this.state;
    const {item: challenge} = this.props.info;

    return (
      <>
        <NavigationEvents onDidBlur={this.handlePageBlur} />

        <TouchableOpacity onPress={this.handlePress}>
          <View key={challenge.id} style={style.tabContentContainer}>
            <Image source={{uri: challenge.imageUrl}} style={style.tabItemImage as any} />

            <View style={{flexGrow: 1, flexShrink: 1, height: "100%"}}>
              <View style={style.tabItemTitleContainer}>
                <AppText style={style.tabItemTitle} numberOfLines={2}>
                  {challenge.title}
                </AppText>

                {isMe && (
                  <PopoverTooltip
                    onOpenTooltipMenu={this.handleOpenTooltipMenu}
                    onCloseTooltipMenu={this.handleCloseTooltipMenu}
                    buttonComponent={<Icon name={isTooltipOpen ? "x" : "more-vertical"} size={25} style={{color: isTooltipOpen ? Variables.blackColor : Variables.cloudyGrayColor}} />}
                    items={[{label: () => <AppText style={style.popoverItemEdit}>Edit</AppText>, onPress: this.handleEdit}, {label: () => <AppText style={style.popoverItemDelete}>Delete</AppText>, onPress: this.handleDelete}]}
                  />
                )}
              </View>

              {!_.isNil(challenge.topIdea) && (
                <View style={style.tabItemInfoContainer}>
                  <View style={{justifyContent: "space-between", flexShrink: 1}}>
                    <AppText style={style.topIdeaTitle}>Winning idea:</AppText>

                    <AppText style={style.topIdeaContent} numberOfLines={1}>
                      {challenge.topIdea.title}
                    </AppText>
                  </View>

                  <View style={style.likesContainer}>
                    <AppText style={style.likesQuantity}>{challenge.topIdea.reactionQuantity}</AppText>
                    <AppText style={style.likesText}>Likes</AppText>
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
