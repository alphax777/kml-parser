import stream from 'stream';
import { Attributes } from '../types/node-xml-stream';

type StreamEventHandler = (...args: any[]) => void;

export default class BaseParser<T> {
    stream: stream.Readable;
    promise: Promise<T>;
    resolveFn: (data: T) => void;
    rejectFn: (error: Error) => void;
    streamBindings: {
        [event: string]: StreamEventHandler;
    } = {};

    constructor(stream: stream.Readable) {
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
