import {Activity, ActivityCategory, Image, Location, Province} from "../documents/SelectionCard.Document";

export class SelectionCardDTO implements Partial<SelectionCardDTO> {
    province: InstanceType<typeof SelectionCardDTO.ProvinceDTO>

    constructor(province: InstanceType<typeof SelectionCardDTO.ProvinceDTO>) {
        this.province = province;
    }

    static readonly LocationDTO = class implements Location {
        readonly lat: number;
        readonly lng: number;

        constructor(lat: number, lng: number) {
            this.lat = lat
            this.lng = lng
        }
    }

    static readonly ImageDTO = class implements Image {
        readonly name?: string;
        readonly img: string;
        readonly alt?: string;

        constructor(name: string, img: string, alt: string) {
            this.name = name;
            this.img = img;
            this.alt = alt;
        }

    }

    static readonly ActivityDTO = class implements Activity {
        readonly desc1: string;
        readonly desc2: string;
        readonly images: InstanceType<typeof SelectionCardDTO.ImageDTO>[];
        readonly locations: InstanceType<typeof SelectionCardDTO.LocationDTO>[];
        readonly name: string;

        constructor(
            desc1: string,
            desc2: string,
            images: InstanceType<typeof SelectionCardDTO.ImageDTO>[],
            locations: InstanceType<typeof SelectionCardDTO.LocationDTO>[],
            name: string
        ) {
            this.desc1 = desc1;
            this.desc2 = desc2;
            this.images = images;
            this.locations = locations;
            this.name = name;
        }
    };

    static readonly ActivityCategoryDTO = class implements ActivityCategory {
        readonly activities:InstanceType<typeof SelectionCardDTO.ActivityDTO>[]
        readonly desc: string;
        readonly img: InstanceType<typeof SelectionCardDTO.ImageDTO>;
        readonly name: string;

        constructor(
            name: string,
            desc: string,
            img: InstanceType<typeof SelectionCardDTO.ImageDTO>,
            activities: InstanceType<typeof SelectionCardDTO.ActivityDTO>[]
        ) {
            this.name = name;
            this.desc = desc;
            this.img = img;
            this.activities = activities
        }
    }

    static readonly ProvinceDTO = class implements Province {
        readonly activityCategory: InstanceType<typeof SelectionCardDTO.ActivityCategoryDTO>[];
        readonly desc: string;
        readonly images: InstanceType<typeof SelectionCardDTO.ImageDTO>[];
        readonly location?: InstanceType<typeof SelectionCardDTO.LocationDTO>;
        readonly name: string;

        constructor(
            activityCategory: InstanceType<typeof SelectionCardDTO.ActivityCategoryDTO>[],
            desc: string,
            images: InstanceType<typeof SelectionCardDTO.ImageDTO>[],
            location: InstanceType<typeof SelectionCardDTO.LocationDTO>,
            name: string
        ) {
            this.name = name;
            this.images = images;
            this.location = location;
            this.desc = desc;
            this.activityCategory = activityCategory;
        }

    }
}