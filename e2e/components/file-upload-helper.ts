import * as fs from "fs";
import * as path from "path";

export class FileUploadHelper {
    static readonly RESOURCES_FOLDER_PATH = "e2e/resources";
    static readonly DEFAULT_ENCODING = "utf8";

    static getFileUploadPath(file: string) {
        return path.join(path.resolve("."), FileUploadHelper.RESOURCES_FOLDER_PATH, file);
    }

    static readFileToString(file: string) {
        const filePath = path.join(path.resolve("."), this.RESOURCES_FOLDER_PATH, file);
        const data = fs.readFileSync(filePath, this.DEFAULT_ENCODING);
        return data.toString();
    }
}
