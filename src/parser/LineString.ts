import BaseParser from './BaseParser';
import { Tags } from './tags';
import { LineString } from '../types/kml';
import TextParser from './TextParser';
import CoordinatesParser from './CoordinatesParser';

export default class LineStringParser extends BaseParser<LineString> {
    lineString: LineString = {};

    async openTag(name: string) {
        switch (name) {
            case Tags.AltitudeMode:
                const textParser = new TextParser(this.stream);
                const altitudeMode = await textParser.parse();
                this.lineString.altitudeMode = altitudeMode;
                break;
            case Tags.Coordinates:
                const coordinatesParser = new CoordinatesParser(this.stream);
                const coordinates = await coordinatesParser.parse();
                this.lineString.coordinates = coordinates;
                break;
        }
    }

    closeTag(name: string) {
        if (name === Tags.LineString) {
            this.resolve(this.lineString);
        }
    }
}
