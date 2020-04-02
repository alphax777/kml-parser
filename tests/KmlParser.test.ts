import fs from 'fs';
import path from 'path';
import Polyline from './data/Polyline';
import PolylineCoordinateConversion from './data/PolylineCoordinateConversion';
import KmlParser from '../src/parser/KmlParser';

describe('KmlParser', () => {
    it('should parse a kml stream and return a design object', async done => {
        const stream = fs.createReadStream(
            path.join(__dirname, './data/Polyline.kml')
        );
        const parser = new KmlParser(stream);
        const output = await parser.parse();
        expect(output).toEqual(Polyline);
        done();
    });

    it('should accept a coordinate conversion function', async done => {
        const stream = fs.createReadStream(
            path.join(__dirname, './data/Polyline.kml')
        );
        const parser = new KmlParser(stream, {
            convertCoordinate: ({ x, y, z }) => ({ x: x + 1, y: y + 1, z }),
        });
        const output = await parser.parse();
        expect(output).toEqual(PolylineCoordinateConversion);
        done();
    });
});
