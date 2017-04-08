import React from "react";
import Emoji, { Twemoji, Emojione } from "../../src/index";
import renderer from "react-test-renderer";

[Emoji, Twemoji, Emojione].forEach(Component => {
  describe(Component.name, () => {
    test("strings with no emoji", () => {
      const component = renderer.create(<Component input="Just some words" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("emoji with a single codepoint", () => {
      const component = renderer.create(<Component input="This ❤️ is 👌" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("emoji with a multiple codepoints", () => {
      const component = renderer.create(
        <Component input="Great work 👍🏾 👨‍👩‍👧‍👦" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("simple aliases", () => {
      const component = renderer.create(
        <Component input="This :smile: is nice :poop:" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("aliases containing underscores", () => {
      const component = renderer.create(
        <Component input=":stuck_out_tongue_winking_eye: wow" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("aliases with skin tone modifiers", () => {
      const component = renderer.create(
        <Component input="Say hello to :woman::skin-tone-3:" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("ascii aliases", () => {
      const component = renderer.create(
        <Component input="That's awesome :)" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("does nothing to unknown aliases", () => {
      const component = renderer.create(
        <Component input="An :unknown: alias" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("a mixture of emoji syntax", () => {
      const component = renderer.create(
        <Component input="This :man::skin-tone-4: is 👌" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("just emoticon", () => {
      const component = renderer.create(<Component input=":D" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("just emoji", () => {
      const component = renderer.create(<Component input="😀" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("with svg prop", () => {
      const component = renderer.create(
        <Component input="This :man::skin-tone-6: is 👌" svg />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
