import {SelectionCardDTO} from "../dto/SelectionCard.DTO";
import {SelectionCardModel} from "../models/SelectionCard.Model";

export async function persist(selectionDTO: SelectionCardDTO): Promise<boolean> {
    try {
        await SelectionCardModel.create({province: selectionDTO.province});
        console.log('Saved Successfully');
        return true;
    } catch (e) {
        throw new Error();
    }
}

export async function retrieveAll(): Promise<SelectionCardDTO[]> {
    try {
        return await SelectionCardModel.find();
    } catch (e) {
        throw new Error();
    }

}