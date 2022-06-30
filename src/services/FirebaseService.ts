import { initializeApp } from "firebase/app";
import {
  collection,
  CollectionReference,
  Firestore,
  getFirestore,
} from "firebase/firestore";
import { injectable } from "inversify";
import IFirebaseService from "./IFirebaseService";

@injectable()
export default class FirebaseService implements IFirebaseService {
  private readonly config = {
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };

  private readonly firestore: Firestore;

  public constructor() {
    initializeApp(this.config);
    this.firestore = getFirestore();
  }

  public getCollection<T>(path: string): CollectionReference<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return collection<T>(this.firestore, path);
  }
}
