import { TUser } from "../user/user.interface";
import User from "../user/user.model";

const signUpUser = async (payload: TUser) => {
    // console.log(payload);

    // check the user with same email is exists or nor!
    const user = await User.isUserExists(payload?.email);
    
    if (user) {
        throw new Error('User already exists!')
    }

    // create user
    const result = await User.create(payload);
    return result;

}



export const AuthServices = {
    signUpUser
}