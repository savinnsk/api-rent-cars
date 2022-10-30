import { UserModel } from "../../domain/models/user"
import { AddAccountUserDTO } from "../../domain/usecases/add-account-protocols"

export interface AddAccountRepository {
  add(account: AddAccountUserDTO): Promise<UserModel>
}
