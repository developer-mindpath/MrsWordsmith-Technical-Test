import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomRequest from "../types/request/customRequest";
import { APIResponse, IEmptyObject } from "../helper/errorHandler/apiResponse";
import { ExpressError } from "../helper/errorHandler";
import constants from "../constants";
import { InsertAccountRequest } from "../types/request/account/insertAccountRequest";
import InsertAccountRequestDTO from "../dto/account/insertAccountRequestDto";
import { GetAccountResponse } from "../types/response/account/getAccountResponse";
import UpdateAccountRequestDTO from "../dto/account/updateAccountRequestDto";
import { UpdateAccountRequest } from "../types/request/account/updateAccountRequest";
import AccountService from "../services/accountService";
import { GetAccountRequest } from "../types/request/account/getAccountRequest";
import { DeleteAccountRequest } from "../types/request/account/deleteAccount";

export default class AccountController {
  private _accountService: AccountService;

  constructor() {
    this._accountService = new AccountService();
  }
  public async insertAccount(
    req: CustomRequest<
      IEmptyObject,
      InsertAccountRequestDTO,
      InsertAccountRequest
    >,
    res: Response<APIResponse<InsertAccountRequestDTO>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = new APIResponse<InsertAccountRequestDTO>();
      const insertAccountRequestDTO = new InsertAccountRequestDTO(req.body);
      const result = await this._accountService.insertAccount(
        insertAccountRequestDTO
      );
      response.status = StatusCodes.OK;
      response.message = constants.API_RESPONSE.SUCCESS;
      response.body = result;
      res.status(StatusCodes.OK).send(response);
    } catch (error) {
      if (error instanceof Error) {
        next(new ExpressError(StatusCodes.BAD_REQUEST, error.message));
      } else {
        next(error);
      }
    }
  }

  public async getAccount(
    req: CustomRequest<GetAccountRequest, GetAccountResponse, IEmptyObject>,
    res: Response<APIResponse<GetAccountResponse>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = new APIResponse<GetAccountResponse>();
      const widgetResponse = await this._accountService.getAccount(
        req.params.userId!
      );
      response.status = StatusCodes.OK;
      response.message = constants.API_RESPONSE.SUCCESS;
      response.body = widgetResponse;
      res.status(StatusCodes.OK).send(response);
    } catch (error) {
      if (error instanceof Error) {
        next(new ExpressError(StatusCodes.BAD_REQUEST, error.message));
      } else {
        next(error);
      }
    }
  }

  public async updateAccount(
    req: CustomRequest<
      IEmptyObject,
      UpdateAccountRequestDTO | null,
      UpdateAccountRequest
    >,
    res: Response<APIResponse<UpdateAccountRequestDTO | null>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = new APIResponse<UpdateAccountRequestDTO | null>();
      const updateAccountRequestDTO = new UpdateAccountRequestDTO(
        req.body
      );
      const result = await this._accountService.updateAccount(
        updateAccountRequestDTO
      );
      response.status = StatusCodes.OK;
      response.message = constants.API_RESPONSE.SUCCESS;
      response.body = result;
      res.status(StatusCodes.OK).send(response);
    } catch (error) {
      if (error instanceof Error) {
        next(new ExpressError(StatusCodes.BAD_REQUEST, error.message));
      } else {
        next(error);
      }
    }
  }

  public async deleteAccount(
    req: CustomRequest<DeleteAccountRequest, IEmptyObject, IEmptyObject>,
    res: Response<APIResponse<IEmptyObject>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = new APIResponse<IEmptyObject>();
      await this._accountService.deleteAccount(req.params.userId!);
      response.status = StatusCodes.OK;
      response.message = constants.API_RESPONSE.SUCCESS;
      response.body = {};
      res.status(StatusCodes.OK).send(response);
    } catch (error) {
      if (error instanceof Error) {
        next(new ExpressError(StatusCodes.BAD_REQUEST, error.message));
      } else {
        next(error);
      }
    }
  }
}
