import Joi from 'joi';

export interface IPostCreateDto {
  content: string;
}

export const postCreateSchema = Joi.object({
  content: Joi.string().required(),
});
