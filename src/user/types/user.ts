import { UserBase } from "./userBase";

export interface User extends UserBase{
    id: number,
    name: string,
    include_adult: boolean,
    sessionId: string
}