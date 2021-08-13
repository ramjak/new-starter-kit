export interface IRequestMeta {
  pageNumber: number;
  limit: number;
}

export interface IMapper<TargetModel, OriginalModel> {
  inbound?: (originalData: OriginalModel) => TargetModel;
  outbound?: (appData: TargetModel) => OriginalModel;
}

interface ICrudHooks<D> {
  store(payload: domainPayload<D>): Promise<unknown>;
  read(id?: string): Promise<D>;
  update(payload: domainPayload<D>, id?: string): Promise<unknown>;
  destroy(id?: string): Promise<unknown>;
}

export type domainPayload<D> = Omit<D, "id" | "userId" | "timestamp">;

type domainHooksType<D, T> = (options?: {
  id?: string | number;
  doUseList?: boolean;
  initialMeta?: Partial<IRequestMeta>;
  inboundMapper?: (originalData: T) => D;
  outboundMapper?: (appData: D) => T;
}) => IDomainData<D> & ICrudHooks<D>;

export default domainHooksType;

export interface IDomainData<D> {
  isLoading: boolean;
  errorMessage: string;
  data: D[];
  [anyProp: string]: any;
}
