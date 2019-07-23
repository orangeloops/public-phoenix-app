import * as _ from "lodash";
import * as React from "react";
import {ActivityIndicator, FlatList, Image, ListRenderItemInfo, RefreshControl, SafeAreaView, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {AccountBase, ProfileTab} from "./AccountBase";
import {observer} from "mobx-react";
import {style} from "./AccountStyles";
import {AppText} from "../../components/AppText";
import {Models} from "../../../core";
import Icon from "react-native-vector-icons/Feather";
import {ChallengeItem} from "./components/challengeitem/ChallengeItem";
import {IdeaItem} from "./components/ideaitem/IdeaItem";
import {Variables} from "../../style";

const editIcon = require("../../assets/account_edit_icon.png");
const editImageIcon = require("../../assets/account_camera_icon.png");

@observer
export class Account extends AccountBase {
  protected renderChallengeItem = (info: ListRenderItemInfo<Models.Challenge>) => <ChallengeItem info={info} isMe={this.isMe} />;

  protected renderIdeaItem = (info: ListRenderItemInfo<Models.Idea>, isIdea: boolean = true) => <IdeaItem info={info} isMe={this.isMe && isIdea} />;

  render() {
    const {isMe, challengesInfo, ideasInfo, reactedIdeasInfo} = this;
    const {userInfo, userImageKey, updatingUserImage} = this.state;
    const {currentUser} = this.dataStore.userState;
    const {navigationState} = this.appStore;

    const user = isMe ? currentUser : this.userParam;
    const {isEditing, name, activeTab} = this.state;
    const userImageSrc = !userInfo.isLoading && !_.isNil(user) ? {uri: `${user.imageUrl}?time=${userImageKey}`} : undefined;

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />

        <SafeAreaView style={style.container}>
          <View style={style.userInfoWrapper}>
            <View style={style.userInfoContainer}>
              <View style={style.userImageContainer}>
                {!_.isNil(userImageSrc) && (
                  <TouchableWithoutFeedback onPress={() => navigationState.navigateToImageViewer([{url: userImageSrc.uri}])}>
                    <Image source={userImageSrc} style={style.userImage as any} />
                  </TouchableWithoutFeedback>
                )}

                <View style={style.userImageBorder} />

                {updatingUserImage && <ActivityIndicator style={style.userImageActivityIndicator} color={Variables.whiteColor} />}

                {(isEditing || isMe) && (
                  <View style={style.editImageIconContainer}>
                    <TouchableOpacity onPress={this.handleSelectImage}>
                      <Image source={editImageIcon} style={style.editImageIcon as any} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={style.userInfoContent}>
                {isEditing ? (
                  <React.Fragment>
                    <View style={style.userInfoInputContainer}>
                      <View style={style.userInfoContentEdit}>
                        <TextInput placeholder="Name" value={name} onChangeText={this.handleChangeName} underlineColorAndroid="transparent" style={style.nameInput} />

                        <TouchableOpacity onPress={this.handleCancelEdit}>
                          <Icon name="x" size={20} style={style.cancelEditIcon} color={Variables.whiteColor} />
                        </TouchableOpacity>
                      </View>

                      {!_.isNil(user) && (
                        <AppText style={style.userInfo} numberOfLines={1}>
                          {!_.isNil(user!.email) ? user!.email : "..."}
                        </AppText>
                      )}
                    </View>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <View style={style.userNameContainer}>
                      <AppText style={style.userName} numberOfLines={1}>
                        {user ? user.name : "..."}
                      </AppText>

                      {isMe && (
                        <TouchableOpacity onPress={this.handleEdit}>
                          <Image source={editIcon} style={style.editIcon as any} />
                        </TouchableOpacity>
                      )}
                    </View>

                    {!_.isNil(user) && isMe && (
                      <AppText style={style.userInfo} numberOfLines={1}>
                        {user ? user.email : "..."}
                      </AppText>
                    )}
                  </React.Fragment>
                )}
              </View>
            </View>

            {isEditing && (
              <TouchableOpacity style={style.saveButtonContainer} onPress={this.handleSave}>
                <AppText style={style.saveButtonText}>SAVE</AppText>
              </TouchableOpacity>
            )}
          </View>

          <View style={style.tabContainer}>
            <TouchableOpacity style={style.tabButtonContainer} onPress={this.handleShowChallenges}>
              <AppText style={[style.tabButtonPrimaryText, activeTab === ProfileTab.Challenges ? style.activeTabButtonText : {}]}>
                {!_.isNil(challengesInfo) && !_.isNil(challengesInfo.totalCount) ? challengesInfo.totalCount : "..."}
              </AppText>
              <AppText style={[style.tabButtonSecondaryText, activeTab === ProfileTab.Challenges ? style.activeTabButtonText : {}]}>Challenges</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={style.tabButtonContainer} onPress={this.handleShowIdeas}>
              <AppText style={[style.tabButtonPrimaryText, activeTab === ProfileTab.Ideas ? style.activeTabButtonText : {}]}>{!_.isNil(ideasInfo) && !_.isNil(ideasInfo.totalCount) ? ideasInfo.totalCount : "..."}</AppText>
              <AppText style={[style.tabButtonSecondaryText, activeTab === ProfileTab.Ideas ? style.activeTabButtonText : {}]}>Ideas</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={style.tabButtonContainer} onPress={this.handleShowLikes}>
              <AppText style={[style.tabButtonPrimaryText, activeTab === ProfileTab.Likes ? style.activeTabButtonText : {}]}>
                {!_.isNil(reactedIdeasInfo) && !_.isNil(reactedIdeasInfo.totalCount) ? reactedIdeasInfo.totalCount : "..."}
              </AppText>
              <AppText style={[style.tabButtonSecondaryText, activeTab === ProfileTab.Likes ? style.activeTabButtonText : {}]}>Likes</AppText>
            </TouchableOpacity>
          </View>

          <View style={style.tabContentWrapper}>
            {activeTab === ProfileTab.Challenges && (
              <FlatList
                style={style.challengeList}
                data={challengesInfo && challengesInfo.challenges ? challengesInfo.challenges.slice() : []}
                renderItem={this.renderChallengeItem}
                keyExtractor={challenge => (challenge as any).id}
                refreshControl={<RefreshControl refreshing={!_.isNil(challengesInfo) && challengesInfo.isLoading} onRefresh={this.fetchChallenges} />}
                ListEmptyComponent={() => {
                  if (!_.isNil(challengesInfo) && !challengesInfo.isLoading && challengesInfo.success) return <AppText style={style.emptyListMessage as any}>There are no challenges to show</AppText>;

                  return null;
                }}
              />
            )}

            {activeTab === ProfileTab.Ideas && (
              <FlatList
                style={style.ideaList}
                data={ideasInfo && ideasInfo.ideas ? ideasInfo.ideas.slice() : []}
                renderItem={(info: ListRenderItemInfo<Models.Idea>) => this.renderIdeaItem(info)}
                keyExtractor={idea => idea.id}
                refreshControl={<RefreshControl refreshing={!_.isNil(ideasInfo) && ideasInfo.isLoading} onRefresh={this.fetchIdeas} />}
                ListEmptyComponent={() => {
                  if (!_.isNil(ideasInfo) && !ideasInfo.isLoading && ideasInfo.success) return <AppText style={style.emptyListMessage as any}>There are no ideas to show</AppText>;

                  return null;
                }}
              />
            )}

            {activeTab === ProfileTab.Likes && (
              <FlatList
                style={style.reactedIdeaList}
                data={reactedIdeasInfo && reactedIdeasInfo.ideas ? reactedIdeasInfo.ideas.slice() : []}
                renderItem={(info: ListRenderItemInfo<Models.Idea>) => this.renderIdeaItem(info, false)}
                keyExtractor={idea => (idea as any).id}
                refreshControl={<RefreshControl refreshing={!_.isNil(reactedIdeasInfo) && reactedIdeasInfo.isLoading} onRefresh={this.fetchIdeasWithReactions} />}
                ListEmptyComponent={() => {
                  if (!_.isNil(reactedIdeasInfo) && !reactedIdeasInfo.isLoading && reactedIdeasInfo.success) return <AppText style={style.emptyListMessage as any}>There are no likes to show</AppText>;

                  return null;
                }}
              />
            )}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
