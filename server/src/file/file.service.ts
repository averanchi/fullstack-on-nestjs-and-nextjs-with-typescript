import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService {

    createFile(type: FileType, file: any): string {
        try {
            const fileExtension = file.originalname.split('.').pop();
            // Генерируем уникальное имя для файла, используя uuid
            const fileName = uuid.v4() + '.' + fileExtension;
            // Путь для папки и файла в ней
            const staticPath = path.resolve(__dirname, '..', 'static', type);
            const filePath = path.resolve(staticPath, fileName);
            // Проверяем, существует ли папка, если нет - создаем ее
            if (!fs.existsSync(staticPath)) {
                fs.mkdirSync(staticPath, { recursive: true });
            }

            fs.writeFileSync(filePath, file.buffer);
            // Возвращаем имя сохраненного файла
            return type + '/' + fileName;

        } catch (error) {
            // Если возникает ошибка при сохранении файла, выбрасываем исключение с сообщением об ошибке
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    removeFile(filename: string) { }

}