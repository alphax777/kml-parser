import { AllHtmlEntities } from 'html-entities';
import BaseParser from './BaseParser';
import TextParser from './TextParser';
import StyleParser from './StyleParser';
import { Placemark } from '../types/kml';
import { Tags } from './tags';
import LineStringParser from './LineStringParser';

const htmlEntities = new AllHtmlEntities();

export default class PlacemarkParser extends BaseParser<Placemark> {
    static Tag = Tags.Placemark;

    placemark: Placemark = {};

    async openTag(tagName: string) {
        switch (tagName) {
            case Tags.Description: {
                this.parseDescription();
                break;
            }
            case Tags.Style: {
                this.parseStyle();
                break;
            }
            case Tags.LineString: {
                this.parseLineString();
                break;
            }
        }
    }

    async parseDescription() {
        const textParser = new TextParser(this.stream);
        const description = await textParser.parse();
        this.placemark.description = htmlEntities.decode(description);
    }

    async parseStyle() {
        const styleParser = new StyleParser(this.stream);
        const style = await styleParser.parse();
        this.placemark.style = style;
    }

    async parseLineString() {
        const lineStringParser = new LineStringParser(
            this.stream,
            this.options
        );
        const lineString = await lineStringParser.parse();
        this.placemark.lineString = lineString;
    }

    closeTag(name: string) {
        if (name === Tags.Placemark) {
            this.resolve(this.placemark);
        }
    }
}
