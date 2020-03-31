import stream from 'stream';
import XmlParser from 'node-xml-stream';
import { Attributes } from '../types/node-xml-stream';
import { Tags } from './tags';
import BaseParser from './BaseParser';
import FolderParser from './Folderparser';
import { Design } from '../types/design';

export default class KmlParser extends BaseParser<Design> {
    output: Design;

    constructor(stream: stream.Readable) {
        const xml = new XmlParser();
        const parserStream = stream.pipe(xml);
        super(parserStream);
        this.output = {
            tables: {
                layer: {
                    layers: {},
                },
            },
            header: [],
            entities: [],
            blocks: {},
        };
    }

    async openTag(name: string, attributes: Attributes) {
        switch (name) {
            case Tags.Folder: {
                const folderParser = new FolderParser(this.stream);
                const folder = await folderParser.parse();
                this.output.tables.layer.layers[folder.name] = folder;
            }
        }
    }

    finish() {
        this.resolve(this.output);
    }
}
