import {SelectionCardDTO} from "../dto/SelectionCard.DTO";
import {Request, Response} from "express";
import {persist, retrieveAll} from "../service/SelectionCard.Service";

export async function post(req: Request, res: Response): Promise<void> {
    const data: SelectionCardDTO = req.body
    console.info(`Province | ${data.province.name}`);

    if (await persist(data)) {
        res.status(200).json({status: 201, message: 'saved successfully'});
        return ;
    }
    res.status(500).json({status: 400, message: 'bad request'});
}

export async function getAll(_: Request, res: Response): Promise<void> {
    const dTOs: SelectionCardDTO[] = await retrieveAll();
    res.status(200).json({data: dTOs});
}