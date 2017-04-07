import React from "react";
import Emoji, { Twemoji, Emojione } from "../../src/index";
import renderer from "react-test-renderer";

[Emoji, Twemoji, Emojione].forEach(Component => {
  describe(Component.name, () => {
    test("strings with no emoji", () => {
      const component = renderer.create(<Component>Just some words</Component>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("emoji with a single codepoint", () => {
      const component = renderer.create(<Component>This ❤️ is 👌</Component>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("emoji with a multiple codepoints", () => {
      const component = renderer.create(
        <Component>Great work 👍🏾 👨‍👩‍👧‍👦</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("simple aliases", () => {
      const component = renderer.create(
        <Component>This :smile: is nice :poop:</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("aliases containing underscores", () => {
      const component = renderer.create(
        <Component>:stuck_out_tongue_winking_eye: wow</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("aliases with skin tone modifiers", () => {
      const component = renderer.create(
        <Component>Say hello to :woman::skin-tone-3:</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("ascii aliases", () => {
      const component = renderer.create(
        <Component>{`That's awesome :)`}</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("does nothing to unknown aliases", () => {
      const component = renderer.create(
        <Component>An :unknown: alias</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("a mixture of emoji syntax", () => {
      const component = renderer.create(
        <Component>This :man::skin-tone-4: is 👌</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("with svg prop", () => {
      const component = renderer.create(
        <Component svg>This :man::skin-tone-6: is 👌</Component>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
