import { UserInfoType } from "../user/types";

export type ConversationDataType = {
    createdAt: string;
    updatedAt: string;
    _id: string;
    members: Array<string>;
}
export type MessageType = {
    conversationId: string;
    createdAt: string;
    updatedAt: string;
    sender: string;
    text: string;
    _id: string;
    isRead: boolean
};
export type ConvoType = {
    data: ConversationDataType
};
export type InitialState = {
    messages: MessageType[];
    loading: boolean,
    error: string,
    currentConversation: Partial<ConversationDataType>,
    friend: Partial<UserInfoType>;
}

export type MessageData = {
    data: MessageType[];
    typing: boolean
};
export type messageProps = {
    data: MessageType;
};

