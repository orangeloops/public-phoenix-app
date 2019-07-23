import * as React from "react";
import {ChallengeIdeaItemBase} from "./ChallengeIdeaItemBase";
import {observer} from "mobx-react";
import {style} from "./ChallengeIdeaItemStyles";
import {Image, TouchableOpacity, View} from "react-native";
import {AppText} from "../../../../components";
import {NavigationEvents} from "react-navigation";

@observer
export class ChallengeIdeaItem extends ChallengeIdeaItemBase {
  protected isNavigating = false;

  protected handlePageBlur = () => {
    this.isNavigating = false;
  };

  protected handlePress = () => {
    const {idea} = this.props;
    const {navigationState} = this.appStore;

    if (this.isNavigating) return;
    this.isNavigating = true;

    navigationState.navigateToIdeasPager({challenge: idea.challenge, idea});
  };

  public render() {
    const {idea} = this.props;

    return (
      <>
        <NavigationEvents onDidBlur={this.handlePageBlur} />

        <TouchableOpacity onPress={this.handlePress}>
          <View style={style.container}>
            <Image source={{uri: idea.imageUrl}} style={style.image as any} />

            <View style={style.titleContainer}>
              <AppText numberOfLines={1} style={style.title}>
                {idea.title}
              </AppText>

              <View style={style.likesContainer}>
                <AppText style={style.likesNumber}>{idea.reactionQuantity}</AppText>
                <AppText style={style.likesText}>Likes</AppText>
              </View>
            </View>

            <AppText style={style.description} numberOfLines={2}>
              {idea.description}
            </AppText>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
