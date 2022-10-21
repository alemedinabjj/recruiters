import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export default {
  googlePopup: async () => {
    firebase.auth().useDeviceLanguage();
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    return result;
  },
  githubPopup: async () => {
    firebase.auth().useDeviceLanguage();
    const provider = new firebase.auth.GithubAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    return result;
  },

  loginWithEmailAndPass: async (email: any, password: any) => {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result;
  },

  userEmailAndPassword: async (email: any, password: any, name: any) => {
    const result = await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user!.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    return result;
  },

  addUser: async (user: any) => {
    await db.collection("users").doc(user.id).set(
      {
        name: user.name,
        avatar: user.avatar,
      },
      { merge: true }
    );
  },

  getFormList: async (userId: any) => {
    let list: any = [];

    let results = await db.collection("users").get();
    results.forEach((result) => {
      let data = result.data();
      if (data.id !== userId) {
        list.push({
          id: result.id,
          ...data,
        });
      }
    });

    return list;
  },

  addNewForm: async (item: any, user: { id: string | undefined }) => {
    await db.collection("forms").add(item);

    db.collection("users")
      .doc(user.id)
      .update({
        forms: firebase.firestore.FieldValue.arrayUnion({
          id: item.id,
          name: item.name,
          email: item.email,
          telephone: item.telephone,
          message: item.message,
          date: item.date,
          time: item.time,
          //   cv: item.cv,
        }),
      });
  },

  //pegar dados do form do usuário logado

  showForm: async (user: { id: string | undefined }) => {
    let list: any = [];

    let results = await db.collection("users").doc(user.id).get();
    let data = results.data();

    if (data?.forms) {
      list.push({
        id: results.id,
        ...data,
      });
    }

    return list;
  },

  //

  //deletar form do usuário logado

  deleteForm: async (user: { id: string | undefined }, item: any) => {
    await db
      .collection("users")
      .doc(user.id)
      .update({
        forms: firebase.firestore.FieldValue.arrayRemove({
          id: item.id,
          name: item.name,
          email: item.email,
          telephone: item.telephone,
          message: item.message,
          date: item.date,
          time: item.time,
          //   cv: item.cv,
        }),
      });
  },

  //function to delete form from database
};
