import { Injectable } from "@nestjs/common";
import { TrackComment, TrackCommentDocument } from "./schemas/trackComment.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { CreateTrackDto } from "./dto/crate-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(TrackComment.name) private trackCommentModel: Model<TrackCommentDocument>
    ) { }

    async create(dto: CreateTrackDto): Promise<Track> {
        const track = await this.trackModel.create({ ...dto, listens: 0 });
        return track;
    }

    async getAll(): Promise<Track[]> {
        const tracks = await this.trackModel.find();
        if (!tracks) {
            throw new Error('Tracks not found');
        }
        return tracks;
    }

    async getOne(id: Types.ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        if (!track) {
            throw new Error('Track not found');
        }
        return track;
    }


    async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        if (!track) {
            throw new Error('Track not found');
        }
        return track._id;
    }

    async addComment(dto: CreateCommentDto): Promise<TrackComment> {
        const track = await this.trackModel.findById(dto.trackId);
        if (!track) {
            throw new Error('Track not found');
        }
        const comment = await this.trackCommentModel.create({ ...dto });
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }
}