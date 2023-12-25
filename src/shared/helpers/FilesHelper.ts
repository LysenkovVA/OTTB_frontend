export class FilesHelper {
    static async getBlobFromString(file: string | undefined) {
        let blob;

        if (file) {
            blob = await fetch(file).then((r) => r.blob());
        }

        return blob;
    }
}
