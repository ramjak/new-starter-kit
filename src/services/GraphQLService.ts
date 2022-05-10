import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { injectable } from "inversify";
import IGraphQLService, { IQueryVars } from "./IGraphQLService";

@injectable()
export default class GraphQLService implements IGraphQLService {
  private readonly baseUrl = process.env.REACT_APP_BASE_GRAPHQL_URL;

  private readonly client = new ApolloClient({
    uri: this.baseUrl,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  public query<Res>(query: string, variables?: IQueryVars): Promise<Res> {
    return this.client
      .query<Res>({
        query: gql(query),
        variables,
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        return res.data;
      });
  }

  public mutate<Res>(query: string, variables?: IQueryVars): Promise<Res> {
    return (
      this.client
        .mutate<Res>({
          mutation: gql(query),
          variables,
        })
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .then((res) => res.data!)
    );
  }

  public subscribe(query: string, variables?: IQueryVars) {
    return this.client.subscribe({
      query: gql(query),
      variables,
    });
  }
}
