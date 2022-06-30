import { CollectionReference } from "firebase/firestore";

export default interface IFirebaseService {
  getCollection<T>(path: string): CollectionReference<T>;
}
