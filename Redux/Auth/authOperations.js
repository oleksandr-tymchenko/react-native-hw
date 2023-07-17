import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

// ? деструктуризируем екшени
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const authSignUpUser =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    // console.log("email, password, name", email, password, name);
    try {
      // рееєструємо юзера
      await createUserWithEmailAndPassword(auth, email, password);
      // метод вище повертає об'єкт, далі оновлюємо профіл і записуємо ім'я

      const user = auth.currentUser;
      console.log("user", user);
      await updateProfile(user, {
        displayName: nickName,
      });
      // далі процедура після оновлення
      const { uid, displayName } = auth.currentUser;

      const userUpdateProfile = {
        userId: uid,
        nickName: displayName,
      };
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log("user", user);
      //   return credentials.user;
    } catch (error) {
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};
const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
