import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
  updateDoc,
  Timestamp,
  Unsubscribe,
} from "firebase/firestore";
import IAdminRepository from "./IAdminRepository";
import TYPES from "../services/types";
import IFirebaseService from "../services/IFirebaseService";
import IAdmin, { IRawAdmin } from "../domains/admin";
import { listenerType, RepositoryState } from "./RepositoryState";

interface IFirebaseAdmin extends IRawAdmin {
  lastUpdated: Timestamp;
}

@injectable()
export default class AdminRepository implements IAdminRepository {
  @inject(TYPES.FirebaseService)
  private readonly firebaseService: IFirebaseService;

  private unsubscribe: Unsubscribe = () => {};

  private state = new RepositoryState<IAdmin>({
    data: [],
    errorMessage: undefined,
    isLoading: false,
    total: 0,
  });

  public delete(id: string): Promise<unknown> {
    const adminsRef = this.firebaseService.getCollection<IFirebaseAdmin>(
      "admins"
    );
    const docRef = doc(adminsRef, id);
    return deleteDoc(docRef).catch((e) => console.error(e));
  }

  public async getAll(page?: number, limitParam?: number): Promise<IAdmin[]> {
    this.unsubscribe();
    const adminsRef = this.firebaseService.getCollection<IFirebaseAdmin>(
      "admins"
    );
    const currentLimit = limitParam || 10;
    const currentStartAt = page ? (page - 1) * currentLimit : 0;
    console.log({ currentLimit, currentStartAt });
    const adminQuery = query<IFirebaseAdmin>(
      adminsRef,
      orderBy("name"),
      startAt(currentStartAt),
      limit(currentLimit)
    );

    return new Promise((resolve) => {
      this.unsubscribe = onSnapshot<IFirebaseAdmin>(
        adminQuery,
        (querySnapshot) => {
          this.state.data = querySnapshot.docs.map((ds) => {
            const data = ds.data();
            return {
              ...ds.data(),
              id: ds.id,
              lastUpdated: data.lastUpdated.toDate(),
            };
          });
          resolve(this.state.data);
        }
      );
    });
    // return this.state.data;
  }

  public async getOne(id: string): Promise<IAdmin> {
    const data = this.state.data.find((a) => a.id === id);
    if (data) {
      return data;
    }

    // console.log("this.adminsRef", this.adminsRef, this.firebaseService);
    const adminsRef = this.firebaseService.getCollection<IFirebaseAdmin>(
      "admins"
    );
    const docRef = doc(adminsRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const snapData = docSnap.data();
      return {
        ...docSnap.data(),
        id: docSnap.id,
        lastUpdated: snapData.lastUpdated.toDate(),
      };
    }

    throw new Error("Data not found!");
  }

  public store(payload: IAdmin): Promise<unknown> {
    const adminsRef = this.firebaseService.getCollection<IFirebaseAdmin>(
      "admins"
    );
    return addDoc(adminsRef, {
      ...payload,
      lastUpdated: Timestamp.now(),
    });
  }

  public subscribe(listener: listenerType<IAdmin>): () => void {
    return this.state.subscribe(listener);
  }

  public update(payload: IRawAdmin, id: string): Promise<unknown> {
    const adminsRef = this.firebaseService.getCollection<IFirebaseAdmin>(
      "admins"
    );
    const docRef = doc(adminsRef, id);
    return updateDoc(docRef, payload).catch((e) => console.error(e));
  }
}
