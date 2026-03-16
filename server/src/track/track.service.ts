import { Injectable, Query } from "@nestjs/common";
import { TrackComment, TrackCommentDocument } from "./schemas/trackComment.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { CreateTrackDto } from "./dto/crate-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService, FileType } from "src/file/file.service";



@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(TrackComment.name) private trackCommentModel: Model<TrackCommentDocument>,
        private fileService: FileService
    ) { }

    async create(dto: CreateTrackDto, picture: Express.Multer.File, audio: Express.Multer.File): Promise<Track> {
        // Пользуемся FileService для сохранения файлов и получения их путей
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        // Создаем новый трек в базе данных с полученными путями к файлам
        const track = await this.trackModel.create({ ...dto, audio: audioPath, picture: picturePath, listens: 0 });
        return track;
    }

    async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(offset).limit(count);
        if (!tracks) {
            throw new Error('Tracks not found');
        }
        return tracks;
    }

    async search(querry: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(querry, 'i') }
        });
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

    async listen(id: Types.ObjectId): Promise<void> {
        const track = await this.trackModel.findById(id);
        if (!track) {
            throw new Error('Track not found');
        }
        track.listens += 1;
        track.save();
    }
}