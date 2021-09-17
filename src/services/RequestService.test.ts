import "reflect-metadata";
import container from "../__mocks__/inversify.config";
import TYPES from "./types";
import IHttpService, {
  IHttpServiceConfig,
  requestMethodEnum,
} from "./IHttpService";
import IRequestService from "./IRequestService";
import RequestService from "./RequestService";

describe("RequestService", () => {
  let calledWith: IHttpServiceConfig[] = [];
  const httpServiceMock: IHttpService = {
    // eslint-disable-next-line
    // @ts-ignore
    request: (...args) => {
      calledWith = args;
      return Promise.resolve({ data: { result: [1, 2, 3] }, status: 200 });
    },
  };

  container
    .bind<IHttpService>(TYPES.HttpService)
    .toConstantValue(httpServiceMock);
  container.bind<IRequestService>(TYPES.RequestService).to(RequestService);
  const requestService = container.get<IRequestService>(TYPES.RequestService);

  it("sends correct config", async () => {
    calledWith = [];
    const url = "http://localhost:3000/post";
    await requestService.request(requestMethodEnum.GET, url, undefined, {
      queryObj: { param1: "nice", param2: "test" },
    });
    expect(calledWith).toEqual([
      {
        data: undefined,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer 123",
          "Content-Type": "application/json",
        },
        method: requestMethodEnum.GET,
        url: `${url}?param1=nice&param2=test`,
      },
    ]);
  });

  it("send correct config with form", async () => {
    calledWith = [];
    const url = "http://localhost:3000/post";
    const file = new File(["foo"], "testfile.txt");
    await requestService.post(
      url,
      { test1: "23", file },
      { doWithFormData: true }
    );
    expect(calledWith[0].data).toBeInstanceOf(FormData);
    expect((calledWith[0].data as FormData).get("test1")).toBe("23");
    expect((calledWith[0].data as FormData).get("file")).toBe(file);
    expect(calledWith[0].method).toBe(requestMethodEnum.POST);
  });

  it("get correct response", async () => {
    const url = "http://localhost:3000/post";
    const res = await requestService.get(url, {
      queryObj: { param1: "nice", param2: "test" },
    });
    expect(res).toEqual({ result: [1, 2, 3] });
  });
});
