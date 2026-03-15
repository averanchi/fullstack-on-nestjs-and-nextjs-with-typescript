import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import dotenv from 'dotenv';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI ?? (() => { throw new Error('MONGODB_URI is not defined'); })()),
        TrackModule,
        FileModule
    ],
    controllers: [],
    providers: []
})

export class AppModule {

}