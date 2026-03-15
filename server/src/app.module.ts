import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot('mongodb+srv://1994hromov_db_user:hoxBA6yp4aajV8yL@cluster0.xvext4z.mongodb.net/nest-next?appName=Cluster0'),
        TrackModule,
        FileModule
    ],
    controllers: [],
    providers: []
})

export class AppModule {

}