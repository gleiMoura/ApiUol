import QueryString from "qs";
export interface participantType {
    name: string
};

export interface messageType {
    to: string,
    text: string,
    type: string
};

export interface completeMessageType {
    to: string,
    text: string,
    type: string
    from: userType,
    time: string
};

export interface fromType {
    from: userType 
};

export interface toType {
    to: userType
}

export type limitType = QueryString.ParsedQs | QueryString.ParsedQs[] | string | string[] | undefined

export type userType = string | string[] | undefined