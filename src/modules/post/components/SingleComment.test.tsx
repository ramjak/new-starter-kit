import "reflect-metadata";
import React from "react";
import renderer from "react-test-renderer";
import SingleComment from "./SingleComment";

it("render SingleComment", () => {
  const result = renderer
    .create(
      <SingleComment
        comment={{
          id: 1,
          body:
            "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium",
          postId: 2,
          name: "poster",
          email: "test@email.com",
        }}
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});
