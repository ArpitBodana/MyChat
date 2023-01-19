import { ConversationDataType } from "../conversation/types"
import { UserInfoType } from "../user/types";

type allConversationDataType = {
    _id: string;
    lastMessage: string,
    time: string
    newMessage: boolean,
}
export type allConvoType = {
    conversation: allConversationDataType[],
    friends: UserInfoType[]
}