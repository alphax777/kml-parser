export type Entity = any;

export type Cartesian3Like = {
    x: number;
    y: number;
    z: number;
};

export type Block = {
    position: Cartesian3Like;
    entities: Array<Entity>;
};

export type BlockMap = {
    [name: string]: Block;
};

export type Layer = {
    name: string;
    color?: number;
};

export type LayerTable = {
    [id: string]: Layer;
};

export type Design = {
    entities: Array<Entity>;
    header: Array<any>;
    tables: {
        layer: {
            layers: LayerTable;
        };
    };
    blocks: BlockMap;
};
