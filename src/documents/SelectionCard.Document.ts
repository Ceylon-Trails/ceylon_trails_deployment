export interface SelectionCardDocument extends Document {
    province: Province;
}

export interface Province {
    name: string;
    location?: Location;
    images: Image[];
    desc?: string;
    activityCategory:ActivityCategory[];
}

export interface ActivityCategory {
    name: string;
    desc: string;
    img: Image;
    activities: Activity[];
}

export interface Activity {
    name: string;
    locations: Location[];
    images: Image[];
    desc1?: string;
    desc2?: string;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Image {
    img: Blob | string;
    name?: string;
    alt?: string;
}
