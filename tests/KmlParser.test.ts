import fs from 'fs';
import path from 'path';
import KmlParser from '../src/parser/KmlParser';

describe('KmlParser', () => {
    it('should parse a kml stream and return a design object', async done => {
        const stream = fs.createReadStream(
            path.join(__dirname, './data/New_chum_overlay_clamp.kml')
        );
        const parser = new KmlParser(stream);
        const output = await parser.parse();
        const expected = JSON.parse(
            fs
                .readFileSync(
                    path.join(__dirname, './data/New_chum_overlay_clamp.json')
                )
                .toString()
        );
        expect(output).toEqual(expected);
        done();
    });
});
