import React from "react";
import Emoji, { Twemoji, Emojione } from "../../src/index";
import renderer from "react-test-renderer";

test("Strings with no emoji", () => {
  const component = renderer.create(<Emoji>Facebook</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Emoji with a single codepoint", () => {
  const component = renderer.create(<Emoji>This ❤️ is 👌</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Emoji with a multiple codepoints", () => {
  const component = renderer.create(<Emoji>Great work 👍🏾 👨‍👩‍👧‍👦</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Simple aliases", () => {
  const component = renderer.create(<Emoji>This :smile: is nice :poop:</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Aliases containing underscores", () => {
  const component = renderer.create(
    <Emoji>:stuck_out_tongue_winking_eye: wow</Emoji>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Aliases with skin tone modifiers", () => {
  const component = renderer.create(
    <Emoji>Say hello to :woman::skin-tone-3:</Emoji>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Ascii aliases", () => {
  const component = renderer.create(<Emoji>{`That's awesome :)`}</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Does nothing to unknown aliases", () => {
  const component = renderer.create(<Emoji>An :unknown: alias</Emoji>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("A mixture of emoji syntax", () => {
  const component = renderer.create(
    <Emoji>This :man::skin-tone-4: is 👌</Emoji>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Emojione", () => {
  const component = renderer.create(
    <Emojione>Hola :woman::skin-tone-3: :D</Emojione>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
