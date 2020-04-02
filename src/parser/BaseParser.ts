import { Attributes } from '../types/node-xml-stream';
import { Coordinate, ConvertCoordinate } from '../types/kml';

type StreamEventHandler = (...args: any[]) => void;

export type ParserOptions = {
    convertCoordinate?: ConvertCoordinate;
};

export default class BaseParser<T> {
    options: ParserOptions;
    stream: NodeJS.ReadableStream;
    promise: Promise<T>;
    resolveFn: (data: T) => void;
    rejectFn: (error: Error) => void;
    streamBindings: {
        [event: string]: StreamEventHandler;
    } = {};

    constructor(stream: NodeJS.ReadableStream, options: ParserOptions = {}) {
        this.options = options;
        this.stream = stream;
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolveFn = resolve;
            this.rejectFn = reject;
        });
        this.on();
    }

    on() {
        this.bindStreamEvent('opentag', this.openTag);
        this.bindStreamEvent('closetag', this.closeTag);
        this.bindStreamEvent('text', this.text);
        this.bindStreamEvent('finish', this.finish);
    }

    off() {
        Object.keys(this.streamBindings).forEach(event => {
            this.stream.off(event, this.streamBindings[event]);
        });
    }

    bindStreamEvent(event: string, func: StreamEventHandler) {
        this.streamBindings[event] = (...args) => func.call(this, ...args);
        this.stream.on(event, this.streamBindings[event]);
    }

    openTag(name: string, attributes: Attributes) {}

    closeTag(name: string) {}

    text(text: string) {}

    finish() {}

    parse(): Promise<T> {
        return this.promise;
    }

    resolve(data: T) {
        this.off();
        this.resolveFn(data);
    }

    reject(error: Error) {
        this.off();
        this.rejectFn(error);
    }
}
