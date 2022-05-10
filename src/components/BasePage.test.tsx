import "reflect-metadata";
import { createRenderer } from "react-test-renderer/shallow";
import BasePage from "./BasePage";

it("render BasePage", () => {
  const shallowRenderer = createRenderer();

  shallowRenderer.render(
    <BasePage
      topNavLinks={[
        { link: "/", text: "Root" },
        { link: "/test", text: "Test" },
      ]}
    >
      children
    </BasePage>
  );
  const result = shallowRenderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
