import NodeCache from "node-cache";
import InsertAccountRequestDTO from "../dto/account/insertAccountRequestDto";
import UpdateAccountRequestDTO from "../dto/account/updateAccountRequestDto";
import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../helper/errorHandler";
import constants from "../constants";

export default class AccountRepository {
  private nodeCache: NodeCache;
  constructor() {
    this.nodeCache = new NodeCache();
  }

  public async insertAccount(
    insertAccountRequestDTO: InsertAccountRequestDTO
  ): Promise<InsertAccountRequestDTO> {
    this.nodeCache.set(
      insertAccountRequestDTO.userId,
      insertAccountRequestDTO
    );
    return insertAccountRequestDTO;
  }

  public async getAccount(userId: string): Promise<void | null> {
    return (await this.nodeCache.get(userId)) || null;
  }

  public async updateAccount(
    updateAccountRequestDTO: UpdateAccountRequestDTO
  ): Promise<UpdateAccountRequestDTO | null> {
    const existingData: UpdateAccountRequestDTO | undefined =
      this.nodeCache.get(updateAccountRequestDTO.userId);
    if (!existingData) {
      throw new ExpressError(
        StatusCodes.BAD_REQUEST,
        constants.VALIDATION_MESSAGE.USERID_NOT_FOUND
      );
    }
    this.nodeCache.del(updateAccountRequestDTO.userId);
    const updatedData: UpdateAccountRequestDTO = {
      name: updateAccountRequestDTO.name || existingData.name,
      email: updateAccountRequestDTO.email || existingData.email,
      phone: updateAccountRequestDTO.phone || existingData.phone,
      address: updateAccountRequestDTO.address || existingData.address,
      userId: updateAccountRequestDTO.userId || existingData.userId,
    };
    this.nodeCache.set(updateAccountRequestDTO.userId, updatedData);
    return updatedData;
  }

  public async deleteAccount(userId: string): Promise<void> {
    this.nodeCache.del(userId);
  }
}
