import express from "express";
import {
  PathParams,
  QueryParams,
  RequestBody,
  ResponseBody,
} from "../types/request/customRequest";
import { doValidation } from "../helper/joi";
import accountValidations from "../requestValidator/account";
import { IEmptyObject } from "../helper/errorHandler/apiResponse";
import { GetAccountResponse } from "../types/response/account/getAccountResponse";
import { InsertAccountRequest } from "../types/request/account/insertAccountRequest";
import { UpdateAccountRequest } from "../types/request/account/updateAccountRequest";
import AccountController from "../controller/accountController";
import InsertAccountRequestDTO from "../dto/account/insertAccountRequestDto";
import { GetAccountRequest } from "../types/request/account/getAccountRequest";
import UpdateAccountRequestDTO from "../dto/account/updateAccountRequestDto";
import { DeleteAccountRequest } from "../types/request/account/deleteAccount";

const accountController = new AccountController();
const router = express.Router();

router.get<
  PathParams<GetAccountRequest>,
  ResponseBody<GetAccountResponse>,
  RequestBody,
  QueryParams
>("/account/:userId", (...arg) => accountController.getAccount(...arg));

router.post<
  PathParams,
  ResponseBody<InsertAccountRequestDTO>,
  RequestBody<InsertAccountRequest>,
  QueryParams
>("/account", doValidation(accountValidations[0]), (...arg) =>
  accountController.insertAccount(...arg)
);

router.patch<
  PathParams,
  ResponseBody<UpdateAccountRequestDTO | null>,
  RequestBody<UpdateAccountRequest>,
  QueryParams
>("/account", doValidation(accountValidations[1]), (...arg) =>
  accountController.updateAccount(...arg)
);

router.delete<
  PathParams<DeleteAccountRequest>,
  ResponseBody<IEmptyObject>,
  RequestBody,
  QueryParams
>("/account/:userId", (...args) => accountController.deleteAccount(...args));
module.exports = { router, basePath: "/api" };
