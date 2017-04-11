import React from "react";
import Emoji, { Twemoji, Emojione } from "../../src/index";
import renderer from "react-test-renderer";

[Emoji, Twemoji, Emojione].forEach(Component => {
  describe(Component.name, () => {
    test("strings with no emoji", () => {
      const component = renderer.create(<Component text="Just some words" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("emoji with a single codepoint", () => {
      const component = renderer.create(<Component text="This ❤️ is 👌" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("emoji with a multiple codepoints", () => {
      const component = renderer.create(
        <Component text="Great work 👍🏾 👨‍👩‍👧‍👦" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("simple aliases", () => {
      const component = renderer.create(
        <Component text="This :smile: is nice :poop:" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("aliases containing underscores", () => {
      const component = renderer.create(
        <Component text=":stuck_out_tongue_winking_eye: wow" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("aliases with skin tone modifiers", () => {
      const component = renderer.create(
        <Component text="Say hello to :woman::skin-tone-3:" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("ascii aliases", () => {
      const component = renderer.create(<Component text="That's awesome :)" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("does nothing to unknown aliases", () => {
      const component = renderer.create(
        <Component text="An :unknown: alias" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("a mixture of emoji syntax", () => {
      const component = renderer.create(
        <Component
          text=":laughing: This is a selection of 💩 emoji :) :ok_hand::skin-tone-3:"
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("just emoticon", () => {
      const component = renderer.create(<Component text=":D" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("just emoji", () => {
      const component = renderer.create(<Component text="😀" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("with svg prop", () => {
      const component = renderer.create(
        <Component text="This :man::skin-tone-6: is 👌" svg />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
