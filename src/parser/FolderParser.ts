import stream from 'stream';
import BaseParser from './BaseParser';
import { Tags } from './tags';
import TextParser from './TextParser';
import { Folder } from '../types/kml';
import PlacemarkParser from './PlacemarkParser';

export default class FolderParser extends BaseParser<Folder> {
    static Tag = Tags.Folder;

    folder: Folder = {
        name: 'DEFAULT',
        placemarks: [],
    };

    async openTag(tagName: string) {
        switch (tagName) {
            case Tags.Name: {
                const textParser = new TextParser(this.stream);
                const name = await textParser.parse();
                this.folder.name = name;
                break;
            }
            case Tags.Placemark: {
                this.parsePlacemark();
            }
        }
    }

    async parsePlacemark() {
        const placemarkParser = new PlacemarkParser(this.stream);
        const placemark = await placemarkParser.parse();
        this.folder.placemarks.push(placemark);
    }

    closeTag(name: string) {
        if (name === Tags.Folder) {
            this.resolve(this.folder);
        }
    }
}
