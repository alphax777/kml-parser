import BaseParser from './BaseParser';
import { Coordinate } from '../types/kml';

export default class CoordinatesParser extends BaseParser<Array<Coordinate>> {
    async text(value: string) {
        const coordinates = value.split(' ').map(chunk => {
            const [x, y, z] = chunk.split(',').map(Number);
            return { x, y, z };
        });
        this.resolve(coordinates);
    }
}
