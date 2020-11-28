import { Document } from 'mongoose';

export class Product extends Document{
    _id: string;
    nome: string;
    marca: string;
    preco: number;
    codigoOriginal: string;
}
