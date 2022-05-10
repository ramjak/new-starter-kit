import "reflect-metadata";
import { render } from "@testing-library/react";
import { useCallback } from "react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ROUTES, { useNavigateTo, useParams } from "../routes";

it("useNavigateTo navigate to correct location", () => {
  let testLocation: unknown;
  const initialPath = "/my/initial/route";
  const TestComponent = () => {
    const navigateTo = useNavigateTo();
    const onClick = useCallback(() => navigateTo(ROUTES.editSinglePost, 23), [
      navigateTo,
    ]);
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    return <button onClick={onClick} type="button" />;
  };

  const { getByRole } = render(
    <MemoryRouter initialEntries={[initialPath]}>
      <TestComponent />
      <Route
        path="*"
        // eslint-disable-next-line react/jsx-no-bind
        render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );

  // assert initial url
  expect((testLocation as Location).pathname).toBe(initialPath);

  userEvent.click(getByRole("button"));
  expect((testLocation as Location).pathname).toBe("/post/23/edit");
});

it("useParams give correct route parameter", () => {
  let expectedParams: unknown;
  const initialPath = "/:this/:is/:params";
  const TestComponent = () => {
    expectedParams = useParams<Record<string, string>>();
    return <div />;
  };

  render(
    <MemoryRouter initialEntries={["/1/23/45"]}>
      <Route
        path={initialPath}
        // eslint-disable-next-line react/jsx-no-bind
        render={() => {
          return <TestComponent />;
        }}
      />
    </MemoryRouter>
  );

  expect(expectedParams).toEqual({ this: "1", is: "23", params: "45" });
});
