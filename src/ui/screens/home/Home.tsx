import * as React from "react";
import * as _ from "lodash";
import {Models} from "../../../core";
import {ActivityIndicator, FlatList, ListRenderItemInfo, RefreshControl, SafeAreaView, StatusBar, View} from "react-native";
import {HomeBase} from "./HomeBase";
import {observer} from "mobx-react";
import {ChallengeItem} from "./components/challengeitem/ChallengeItem";
import {style} from "./HomeStyles";
import {AppText} from "../../components";
import {AppButton} from "../../components/appbutton";
import {Variables} from "../../style";

@observer
export class Home extends HomeBase {
  protected renderItem = (listItem: ListRenderItemInfo<Models.Challenge>) => <ChallengeItem challenge={listItem.item} />;

  render() {
    const {challengeState} = this.dataStore;
    const {fetchChallengeListStatus, challengeList} = challengeState;

    let content;

    if (_.isNil(challengeList) && fetchChallengeListStatus.isLoading)
      content = (
        <View style={{marginTop: "auto", marginBottom: "auto"}}>
          <ActivityIndicator size="large" />
        </View>
      );
    else if (_.isNil(challengeList) && fetchChallengeListStatus.success === false)
      content = (
        <View style={style.errorContent}>
          <AppText style={style.errorMessage}>Could not get the list challenges.</AppText>

          <AppButton icon="refresh-cw" onPress={this.fetchChallengeList} style={style.tryAgainButton}>
            Try again
          </AppButton>
        </View>
      );
    else
      content = (
        <FlatList
          data={challengeList ? challengeList.slice() : []}
          renderItem={this.renderItem}
          keyExtractor={challenge => challenge.id}
          refreshControl={<RefreshControl refreshing={fetchChallengeListStatus.isLoading} onRefresh={() => challengeState.fetchChallengeList()} />}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          style={style.challengeList}
          ListEmptyComponent={() => {
            if (!fetchChallengeListStatus.isLoading) return <AppText style={style.emptyListMessage as any}>There are no challenges to show</AppText>;

            return null;
          }}
        />
      );

    return (
      <SafeAreaView style={style.container}>
        <StatusBar barStyle="light-content" backgroundColor={Variables.primaryColor} />

        {content}
      </SafeAreaView>
    );
  }
}
