import {model, Model, Schema} from "mongoose";
import {
    Activity,
    ActivityCategory,
    Image,
    Location,
    Province,
    SelectionCardDocument
} from "../documents/SelectionCard.Document";

const imgSchema: Schema = new Schema<Image>({
    name: {type: "string"},
    img: {type: "string", required: true, unique: true},
    alt: {type: "string"}
});

const locationSchema: Schema = new Schema<Location>({
    lat: {type: "number", required: true},
    lng: {type: "number", required: true},
});

const activitySchema:Schema = new Schema<Activity>({
    name: {type: "string", required: true},
    locations: [locationSchema],
    images: [imgSchema],
    desc1: {type:"string",required: false},
    desc2: {type:"string",required: false},
});

const activityCategorySchema:Schema = new Schema<ActivityCategory>({
    name: {type: "string", required: true},
    desc: {type:"string",required: false},
    img:imgSchema,
    activities:[activitySchema]
});

const provinceSchema:Schema=new Schema<Province>({
    name: {type:"string",required:true,unique:true},
    images: [imgSchema],
    activityCategory:[activityCategorySchema]
});

const selectionCardModelSchema:Schema= new Schema<SelectionCardDocument>({
    province:provinceSchema
});

export const SelectionCardModel : Model<SelectionCardDocument>= model<SelectionCardDocument>('selection_card',selectionCardModelSchema);