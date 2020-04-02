import XmlParser from 'node-xml-stream';
import { Attributes } from '../types/node-xml-stream';
import { Tags } from './tags';
import BaseParser, { ParserOptions } from './BaseParser';
import FolderParser from './FolderParser';
import { Design, Layer } from '../types/design';
import hexToLong from '../utils/hexToLong';

export default class KmlParser extends BaseParser<Design> {
    output: Design;
    activeLayer: Layer;

    constructor(stream: NodeJS.ReadableStream, options: ParserOptions = {}) {
        const xml = new XmlParser();
        const parserStream: NodeJS.ReadableStream = stream.pipe(xml);
        parserStream.setMaxListeners(100);
        super(parserStream, options);
        this.output = {
            tables: {
                layer: {
                    handle: '2',
                    ownerHandle: '0',
                    layers: {},
                },
            },
            header: [],
            entities: [],
            blocks: {},
        };
    }

    openTag(name: string, attributes: Attributes) {
        switch (name) {
            case Tags.Folder: {
                this.parseFolder();
                break;
            }
        }
    }

    async parseFolder() {
        const folderParser = new FolderParser(this.stream, this.options);
        const folder = await folderParser.parse();
        const { name, placemarks } = folder;
        this.output.tables.layer.layers[folder.name] = { name };
        placemarks.forEach(placemark => {
            const { description, lineString, style } = placemark;
            if (lineString) {
                this.output.entities.push({
                    handle: this.output.entities.length.toString(),
                    layer: name,
                    type: 'POLYLINE',
                    color:
                        style && style.lineStyle
                            ? hexToLong(style.lineStyle.color)
                            : 0xffffff,
                    vertices: lineString.coordinates || [],
                    extendedData: description
                        ? {
                              customStrings: [description],
                          }
                        : undefined,
                });
            }
        });
    }

    finish() {
        this.resolve(this.output);
    }
}
