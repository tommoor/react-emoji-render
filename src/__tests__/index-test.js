import React from "react";
import Emoji from "../../src/index";
import renderer from "react-test-renderer";

test("Handles strings with no emoji", () => {
  const component = renderer.create(<Emoji>Facebook</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Handles emoji with a single codepoint", () => {
  const component = renderer.create(<Emoji>This ❤️ is 👌</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Handles emoji with a multiple codepoints", () => {
  const component = renderer.create(<Emoji>Great work 👍🏾 👨‍👩‍👧‍👦</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
