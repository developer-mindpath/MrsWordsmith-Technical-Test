import InsertAccountRequestDTO from "../dto/account/insertAccountRequestDto";
import { GetAccountResponse } from "../types/response/account/getAccountResponse";
import UpdateAccountRequestDTO from "../dto/account/updateAccountRequestDto";
import AccountRepository from "../repository/accountRepository";

export default class AccountService {
  private _accountRepository: AccountRepository;
  constructor() {
    this._accountRepository = new AccountRepository();
  }

  public async insertAccount(
    insertAccountRequestDTO: InsertAccountRequestDTO
  ): Promise<InsertAccountRequestDTO> {
    return await this._accountRepository.insertAccount(
      insertAccountRequestDTO
    );
  }

  public async getAccount(userId: string): Promise<GetAccountResponse> {
    const response = await this._accountRepository.getAccount(userId);
    return response ? response : ({} as GetAccountResponse);
  }

  public async updateAccount(
    updateAccountRequestDTO: UpdateAccountRequestDTO
  ): Promise<UpdateAccountRequestDTO | null> {
    return await this._accountRepository.updateAccount(
      updateAccountRequestDTO
    );
  }

  public async deleteAccount(userId: string): Promise<void> {
    await this._accountRepository.deleteAccount(userId);
  }
}
