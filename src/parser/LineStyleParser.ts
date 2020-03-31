import BaseParser from './BaseParser';
import { Tags } from './tags';
import { LineStyle } from '../types/kml';
import TextParser from './TextParser';

export default class LineStyleParser extends BaseParser<LineStyle> {
    async openTag(name: string) {
        switch (name) {
            case Tags.Color:
                const textParser = new TextParser(this.stream);
                const color = await textParser.parse();
                this.resolve({
                    color,
                });
                break;
        }
    }
}
