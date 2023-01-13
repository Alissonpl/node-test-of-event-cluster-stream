class UserService {
  #user = [];
  execute(aa) {
    this.#user.push(aa);
    console.log(aa);
  }
}
export const userService = new UserService();
