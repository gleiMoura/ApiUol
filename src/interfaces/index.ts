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
    time: string,
    wasEdited?: boolean
};

export interface fromType {
    from: userType
};

export interface toType {
    to: userType
}

export type limitType = string

export type userType = string | string[] | undefined