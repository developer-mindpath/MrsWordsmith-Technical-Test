import { UpdateAccountRequest } from "../../types/request/account/updateAccountRequest";

export default class UpdateAccountRequestDTO {
  name: string;
  email: string;
  address: string;
  phone: string;
  userId: string;

  constructor(body: UpdateAccountRequest) {
    this.name = body.name;
    this.email = body.email;
    this.address = body.address;
    this.phone = body.phone;
    this.userId = body.userId;
  }
}
