import { inject, injectable } from "inversify";
import IUserRepository from "./IUserRepository";
import IUser, { IRawUser } from "../domains/user";
import TYPES from "../services/types";
import IGraphQLService from "../services/IGraphQLService";
import { listenerType, RepositoryState } from "./RepositoryState";

@injectable()
export default class UserRepository implements IUserRepository {
  @inject(TYPES.GraphQLService)
  private readonly graphqlService: IGraphQLService;

  private readonly readQuery = `
    query Users($where: users_bool_exp, $limit: Int, $offset: Int, $orderBy: [users_order_by!]) {
      users(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
        id
        name
        rocket
        twitter
        timestamp
      }
    }
  `;

  private readonly storeQuery = `
    mutation Insert_users($objects: [users_insert_input!]!) {
      insert_users(objects: $objects) {
        returning {
          id
          name
          rocket
          timestamp
          twitter
        }
      }
    }
  `;

  private readonly deleteQuery = `
    mutation Delete_users($where: users_bool_exp!) {
      delete_users(where: $where) {
        returning {
          id
        }
      }
    }
  `;

  private readonly updateQuery = `
    mutation Update_users($where: users_bool_exp!, $set: users_set_input) {
      update_users(where: $where, _set: $set) {
        returning {
          id
          name
          rocket
          timestamp
          twitter
        }
      }
    }
  `;

  private state = new RepositoryState<IUser>({
    data: [],
    errorMessage: undefined,
    isLoading: false,
    total: 0,
  });

  public subscribe(listener: listenerType<IUser>) {
    return this.state.subscribe(listener);
  }

  public async delete(id: string): Promise<unknown> {
    this.state.isLoading = true;
    try {
      const res = await this.graphqlService.mutate(this.deleteQuery, {
        where: {
          id: {
            _eq: id,
          },
        },
      });
      await this.getAll();

      return res;
    } catch (e) {
      this.state.errorMessage = e.message;
    } finally {
      this.state.isLoading = false;
    }
  }

  public async getAll(page = 1, limit = 10): Promise<IUser[]> {
    this.state.isLoading = true;
    try {
      const res = await this.graphqlService.query<{ users: IUser[] }>(
        this.readQuery,
        {
          limit,
          offset: (page - 1) * limit,
          orderBy: [
            {
              timestamp: "desc",
            },
          ],
        }
      );
      this.state.data = res.users;
      return res.users;
    } catch (e) {
      this.state.errorMessage = e.message;
      return this.state.data;
    } finally {
      this.state.isLoading = false;
    }
  }

  public getOne(id: string): Promise<IUser> {
    return this.graphqlService
      .query<{ users: IUser[] }>(this.readQuery, {
        where: {
          id: {
            _eq: id,
          },
        },
      })
      .then((r) => r.users[0]);
  }

  public async store(payload: IRawUser): Promise<unknown> {
    this.state.isLoading = true;
    try {
      const res = await this.graphqlService.mutate(this.storeQuery, {
        objects: [payload],
      });
      await this.getAll();

      return res;
    } catch (e) {
      this.state.errorMessage = e.message;
    } finally {
      this.state.isLoading = false;
    }
  }

  public async update(payload: IRawUser, id: string): Promise<unknown> {
    this.state.isLoading = true;
    try {
      const res = await this.graphqlService.mutate(this.updateQuery, {
        where: {
          id: {
            _eq: id,
          },
        },
        set: payload,
      });
      await this.getAll();

      return res;
    } catch (e) {
      this.state.errorMessage = e.message;
    } finally {
      this.state.isLoading = false;
    }
  }
}
