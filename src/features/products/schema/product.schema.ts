import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const ProductSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, maxlength: 100, unique: true },
    marca: { type: String },
    preco: { type: Number, required: true },
    codigoOriginal: String,
  },
  {
    timestamps: true,
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    optimisticConcurrency: true,
    collection: 'produtos',
  },
);

ProductSchema.plugin(mongoosePaginate);
