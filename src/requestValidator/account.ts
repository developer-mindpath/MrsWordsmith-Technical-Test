import Joi from "joi";
import { InsertAccountRequest } from "../types/request/account/insertAccountRequest";
import { UpdateAccountRequest } from "../types/request/account/updateAccountRequest";
import { IEmptyObject } from "../helper/errorHandler/apiResponse";
import { joiValidationRequest } from "../helper/joi";
import { GetAccountRequest } from "../types/request/account/getAccountRequest";

const accountValidations  = {
  0: joiValidationRequest<IEmptyObject, InsertAccountRequest, IEmptyObject>({
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  1: joiValidationRequest<IEmptyObject, UpdateAccountRequest, IEmptyObject>({
    body: {
      userId: Joi.string().required(),
      name: Joi.string(),
      email: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
    },
  }),
  2: joiValidationRequest<IEmptyObject, GetAccountRequest, IEmptyObject>({
    body: {
      userId: Joi.string().required(),
    },
  }),
};

export default accountValidations;
