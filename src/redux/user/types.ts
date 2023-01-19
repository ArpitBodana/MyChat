export type UserDataType = {
    _id: string,
    name: string,
    email: string,
    isActive: boolean,
    isAdmin: boolean,
    access_token: string

}
export type UserInfoType = {
    _id: string,
    name: string,
    email: string,
    isActive: boolean,
    isAdmin: boolean,
    access_token: string,
    profileImageUrl: string,
    coverImageUrl: string,
    followers: string[],
    followings: string[],
    desc: string,
    city: string,
    country: string,
    updatedAt: string,
    createdAt: string,
    requests: string[]
}

export type InitialState = {
    loading: boolean,
    error: string,
    user: Partial<UserDataType>
    info: Partial<UserInfoType>
    onlineUsers: Array<string>
}
