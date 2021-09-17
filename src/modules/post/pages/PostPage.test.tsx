import "reflect-metadata";
import React from "react";
import { Provider } from "inversify-react";
import { Container } from "inversify";
import renderer from "react-test-renderer";
import { render, waitFor, screen, getByTestId } from "@testing-library/react";
import TYPES from "../../../services/types";
import IPostRepository from "../../../repositories/IPostRepository";
import PostPage from "./PostPage";
import IPost from "../../../domains/post";

describe("PostPage", () => {
  const samplePosts: IPost[] = [
    { title: "lol", id: 1, body: "test1", userId: 1 },
    { title: "title", id: 2, body: "test2", userId: 2 },
  ];

  const container = new Container();
  container.bind<IPostRepository>(TYPES.PostRepository).toConstantValue({
    getAll: () => {
      return Promise.resolve(samplePosts);
    },
    read: jest.fn(),
    store: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  it("renders base structure correctly at first load", () => {
    const result = renderer
      .create(
        <Provider container={container}>
          <PostPage />
        </Provider>
      )
      .toJSON();

    expect(result).toMatchSnapshot();
  });

  // todo: isolate the page from the the children components
  it("render fetched posts", async () => {
    render(
      <Provider container={container}>
        <PostPage />
      </Provider>
    );

    await waitFor(() => screen.getByRole("heading"));
    const postArticles = screen.getAllByRole("article");

    expect(getByTestId(postArticles[0], "view-btn")).toHaveTextContent("lol");
    expect(getByTestId(postArticles[0], "article-body")).toHaveTextContent(
      "test1"
    );

    expect(getByTestId(postArticles[1], "view-btn")).toHaveTextContent("title");
    expect(getByTestId(postArticles[1], "article-body")).toHaveTextContent(
      "test2"
    );
  });
});
