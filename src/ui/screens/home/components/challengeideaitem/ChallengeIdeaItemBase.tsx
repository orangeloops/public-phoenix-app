import {BaseComponent, BaseComponentProps, BaseComponentState} from "../../../../BaseComponent";
import {Idea} from "../../../../../core/models";

export interface ChallengeIdeaItemProps extends BaseComponentProps {
  idea: Idea;
}

export interface ChallengeIdeaItemState extends BaseComponentState {}

export abstract class ChallengeIdeaItemBase extends BaseComponent<ChallengeIdeaItemProps, ChallengeIdeaItemState> {}
