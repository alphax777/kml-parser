import fs from 'fs';
import path from 'path';
import parse from '../src/parser/KmlParser';
import KmlParser from '../src/parser/KmlParser';

describe('parser', () => {
    it('should parse and return an xml', async done => {
        const stream = fs.createReadStream(
            path.join(__dirname, './data/New_chum_overlay_clamp.kml')
        );
        const parser = new KmlParser(stream);
        const output = await parser.parse();
        expect(output).toEqual({
            tables: {
                layer: {
                    layers: {
                        New_chum_overlay_GIS: { name: 'New_chum_overlay_GIS' },
                    },
                },
            },
            header: [],
            entities: [],
            blocks: {},
        });
        done();
    });
});
