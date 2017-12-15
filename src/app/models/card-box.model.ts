import { CardBoxType } from './card-box-type.enum';

export interface CardBox {

    type:CardBoxType,
    classList:string,
    click?():void,
    venue?:string,
    dateTime?:Date,
    imageUrl?:string,
    title?:string,
    artists?:string

}