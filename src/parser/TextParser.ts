import BaseParser from './BaseParser';

export default class TextParser extends BaseParser<string> {
    text(value: string) {
        this.resolve(value);
    }
}
