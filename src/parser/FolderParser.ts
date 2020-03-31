import stream from 'stream';
import BaseParser from './BaseParser';
import { Tags } from './tags';
import TextParser from './TextParser';

const Name = 'name';

type Folder = {
    name: string;
};

export default class FolderParser extends BaseParser<Folder> {
    static Tag = Tags.Folder;

    async openTag(tagName: string) {
        switch (tagName) {
            case Tags.Name: {
                const textParser = new TextParser(this.stream);
                const name = await textParser.parse();
                this.resolve({
                    name,
                });
            }
        }
    }

    closeTag(name: string) {}
}
