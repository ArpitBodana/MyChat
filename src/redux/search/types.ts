import { UserInfoType } from "../user/types"

export type SearchState = {
    searchInfo: UserInfoType[],
    error: string,
    loading: boolean,
}