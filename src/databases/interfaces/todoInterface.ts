import { Schema } from "mongoose"

export interface TodoInterface extends Document{
    userId:Schema.Types.ObjectId,
    titles: string
}