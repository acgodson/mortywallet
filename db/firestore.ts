import {
  getFirestore,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  DocumentSnapshot,
} from "firebase/firestore";
import { initFirebase } from "../config";

initFirebase();
const db = getFirestore();

export const sumArray = (array: [any]) => {
  let sum = 0;
  array.forEach((item) => {
    sum += item;
  });
  return sum;
};

type UserType = {
  country: string;
  email: string;
  imgUrl: string;
  name: string;
  phone: string;
  uid: string;
};

export const createUser = (email: string, country: string, userId: string) => {
  const usersColRef = doc(db, "users", userId);
  return setDoc(usersColRef, {
    uid: userId,
    name: "",
    email: email,
    country: country,
    phone: "",
    imgUrl: "",
    created: serverTimestamp(),
  });
};

export const getUser = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const getRef = await getDoc(userDocRef);
  const data = getRef.data();
  const dataObj: UserType = {
    country: data.country,
    email: data.email,
    imgUrl: data.imgUrl,
    name: data.name,
    phone: data.phone,
    uid: data.uid,
  };
  return dataObj;
};

export const streamUser = (userId: string) => {
  onSnapshot(doc(db, "users", userId), (doc) => {
    return doc.data();
  });
};

export const streamAllUsers = async () => {
  const ref = collection(db, "users");
  const snapshot = await getDocs(ref);
  const users = [];
  snapshot.docs.forEach((x: DocumentSnapshot) => {
    var id = x.id;
    users.push({ ...x.data(), id });
  });

  return users;
};

export const getWallet = (id: string) => {
  onSnapshot(doc(db, "wallets", id), (doc) => {
    return doc.data();
  });
};

export const deleteWallet = (walletID: string) => {
  const doRef = doc(db, "wallets", walletID);
  return deleteDoc(doRef);
};

export const deleteUser = (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  return deleteDoc(userDocRef);
};

export const updateUserData = (userId: string, data: any) => {
  const userDocRef = doc(db, "users", userId);
  return updateDoc(userDocRef, data);
};
