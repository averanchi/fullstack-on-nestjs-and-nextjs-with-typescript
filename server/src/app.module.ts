import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://1994hromov_db_user:hoxBA6yp4aajV8yL@cluster0.xvext4z.mongodb.net/nest-next?appName=Cluster0'),
        TrackModule
    ],
    controllers: [],
    providers: []
})

export class AppModule {

}