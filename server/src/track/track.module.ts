import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Track, TrackSchema } from "./schemas/track.schema";
import { TrackComment, TrackCommentSchema } from "./schemas/trackComment.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([{ name: TrackComment.name, schema: TrackCommentSchema }])
    ],
    controllers: [TrackController],
    providers: [TrackService]
})


export class TrackModule {

}