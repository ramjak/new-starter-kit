/* eslint-disable react/jsx-no-bind */
import "reflect-metadata";
import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import SinglePost from "./SinglePost";

it("render SinglePost", () => {
  const result = renderer
    .create(
      <SinglePost
        item={{
          userId: 1,
          title: "title",
          id: 2,
          body:
            "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
        }}
        view={() => undefined}
        edit={() => undefined}
        destroy={() => Promise.resolve()}
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

it("invoke functions on buttons click", () => {
  const viewFn = jest.fn();
  const editFn = jest.fn();
  const destroyFn = jest.fn();

  const { getByTestId } = render(
    <SinglePost
      item={{
        userId: 1,
        title: "title",
        id: 2,
        body:
          "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      }}
      view={viewFn}
      edit={editFn}
      destroy={destroyFn}
    />
  );

  fireEvent.click(getByTestId("view-btn"));
  expect(viewFn).toBeCalledWith("2");

  fireEvent.click(getByTestId("edit-btn"));
  expect(editFn).toBeCalledWith("2");

  fireEvent.click(getByTestId("destroy-btn"));
  expect(destroyFn).toBeCalledWith("2");
});
