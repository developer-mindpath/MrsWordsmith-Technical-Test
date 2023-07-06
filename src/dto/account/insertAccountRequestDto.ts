import { InsertAccountRequest } from "../../types/request/account/insertAccountRequest";
import { v4 as uuidv4 } from "uuid";
export default class InsertAccountRequestDTO {
  name: string;
  email: string;
  address: string;
  phone: string;
  userId: string;

  constructor(body: InsertAccountRequest) {
    this.name = body.name;
    this.email = body.email;
    this.address = body.address;
    this.phone = body.phone;
    this.userId = uuidv4();
  }
}
