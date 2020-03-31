export type Folder = {
    name: string;
    placemarks: Array<Placemark>;
};

export type Placemark = {
    description?: string;
    style?: Style;
    lineString?: LineString;
};

export type LineStyle = {
    color: string;
};

export type Style = {
    lineStyle?: LineStyle;
};

export type LineString = {
    altitudeMode?:
        | 'relativeToGround'
        | 'absolute'
        | 'relativeToSeaFloor'
        | 'clampToGround'
        | 'clampToSeaFloor'
        | string;
    coordinates?: Array<Coordinate>;
};

export type Coordinate = {
    x: number;
    y: number;
    z: number;
};
