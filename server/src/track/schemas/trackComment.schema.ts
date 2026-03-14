import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Track } from './track.schema';


export type TrackCommentDocument = HydratedDocument<TrackComment>;

@Schema()
export class TrackComment {
    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
    track: Track | Types.ObjectId;

}

export const TrackCommentSchema = SchemaFactory.createForClass(TrackComment);
