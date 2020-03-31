import BaseParser from './BaseParser';
import { Style } from '../types/kml';
import { Tags } from './tags';
import LineStyleParser from './LineStyleParser';

export default class StyleParser extends BaseParser<Style> {
    style: Style = {};

    async openTag(name: string) {
        switch (name) {
            case Tags.LineStyle:
                const lineStyleParser = new LineStyleParser(this.stream);
                this.style.lineStyle = await lineStyleParser.parse();
                break;
        }
    }

    closeTag(name: string) {
        if (name === Tags.Style) {
            this.resolve(this.style);
        }
    }
}
