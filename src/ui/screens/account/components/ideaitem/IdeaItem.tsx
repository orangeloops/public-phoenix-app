import * as _ from "lodash";
import * as React from "react";
import {Alert, Image, ListRenderItemInfo, TouchableOpacity, View} from "react-native";
import {Models} from "../../../../../core";
import {style} from "./IdeaItemStyle";
import {AppText} from "../../../../components";
import {BaseComponent} from "../../../../BaseComponent";
import {observer} from "mobx-react";
import PopoverTooltip from "react-native-popover-tooltip";
import Icon from "react-native-vector-icons/Feather";
import {NavigationEvents} from "react-navigation";
import {Variables} from "../../../../style";

export interface ChallengeItemProps {
  info: ListRenderItemInfo<Models.Idea>;
  isMe?: boolean;
  onDelete?: () => void;
}

export interface IdeaItemState {
  isTooltipOpen: boolean;
}

@observer
export class IdeaItem extends BaseComponent<ChallengeItemProps, IdeaItemState> {
  protected isNavigating = false;

  protected handlePageBlur = () => {
    this.isNavigating = false;
  };

  protected handlePress = async () => {
    const {navigationState} = this.appStore;
    const {item: idea} = this.props.info;

    if (this.isNavigating) return;
    this.isNavigating = true;

    navigationState.navigateToIdeasPager({challenge: idea.challenge, idea});
  };

  protected handleEdit = () => {
    const {item: idea} = this.props.info;
    const {navigationState} = this.appStore;

    navigationState.navigateToNewIdea({idea});
  };

  protected handleDelete = () => {
    setTimeout(() => Alert.alert("Delete idea", "Are you sure you want to delete this idea?", [{text: "Yes", onPress: () => this.deleteIdea()}, {text: "Cancel"}], {cancelable: true}), 600);
  };

  protected deleteIdea = async () => {
    const {ideaState} = this.dataStore;
    const {info, onDelete} = this.props;

    await ideaState.deleteIdea({idea: info.item});

    if (!_.isNil(onDelete)) onDelete();
  };

  protected handleOpenTooltipMenu = () => {
    this.setState({isTooltipOpen: true});
  };

  protected handleCloseTooltipMenu = () => {
    this.setState({isTooltipOpen: false});
  };

  render() {
    const {isMe} = this.props;
    const {isTooltipOpen} = this.state;
    const {item: idea} = this.props.info;

    return (
      <>
        <NavigationEvents onDidBlur={this.handlePageBlur} />

        <TouchableOpacity onPress={this.handlePress}>
          <View style={style.tabContentContainer}>
            <Image source={{uri: idea.imageUrl}} style={style.tabItemImage as any} />

            <View style={{flexGrow: 1, flexShrink: 1, height: "100%"}}>
              <View style={style.tabItemTitleContainer}>
                <AppText style={style.tabItemTitle} numberOfLines={2}>
                  {idea.title}
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

              <View style={style.tabIdeaInfoContainer}>
                <AppText style={{flexShrink: 1, width: "100%"}} numberOfLines={2}>
                  {idea.description}
                </AppText>
                <View style={style.likesContainer}>
                  <AppText style={style.likesQuantity}>{idea.reactionQuantity}</AppText>
                  <AppText style={style.likesText}>Likes</AppText>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
