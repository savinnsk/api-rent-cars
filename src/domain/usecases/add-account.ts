
export interface AddAccountUserDTO {
  name: string
  username: string
  password: string
  email: string
  driver_license: string
}

export interface AddAccount {
  add: (account: AddAccountUserDTO) => Promise<AddAccountUserDTO>
}
