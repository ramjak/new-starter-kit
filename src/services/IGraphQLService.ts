export interface IQueryVars {
  [extraProps: string]: unknown;
}

export default interface IGraphQLService {
  query<Res>(query: string, variables?: IQueryVars): Promise<Res>;
  mutate<Res>(query: string, variables?: IQueryVars): Promise<Res>;
  subscribe(query: string, variables?: IQueryVars): unknown;
}
