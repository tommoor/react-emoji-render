import React from "react";
import Emoji, { Twemoji, Emojione, EmojioneV4, toArray } from "../../src/index";
import renderer from "react-test-renderer";

[Emoji, Twemoji, Emojione, EmojioneV4].forEach((Component) => {
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
      const component = renderer.create(<Component text="Great work 👍🏾 👨‍👩‍👧‍👦" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("simple aliases", () => {
      const component = renderer.create(
        <Component text="This :smile: is nice :+1:" />
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
        <Component text="Say hello to :woman::skin-tone-6:" />
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
        <Component text=":laughing: This is a selection of 💩 emoji :) :ok_hand::skin-tone-6:" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("just emoticon should add onlyEmojiClassName", () => {
      const component = renderer.create(
        <Component text=":D" onlyEmojiClassName="onlyEmojiClass" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("just emoji should add onlyEmojiClassName", () => {
      const component = renderer.create(
        <Component text="😀" onlyEmojiClassName="onlyEmojiClass" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("three emoji should add onlyEmojiClassName", () => {
      const component = renderer.create(
        <Component text="😀👍🏾💞" onlyEmojiClassName="onlyEmojiClass" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("four emoji should not add onlyEmojiClassName", () => {
      const component = renderer.create(
        <Component text="👋😀👍🏾💞" onlyEmojiClassName="onlyEmojiClass" />
      );
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

    test("with size prop", () => {
      const component = renderer.create(
        <Component text="This :man::skin-tone-6: is 👌" size={32} />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("composed emojis containing U+200D and U+FE0F chars", () => {
      const component = renderer.create(<Component text="👩‍⚕️" />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("toArray", () => {
  test("a mixture of emoji syntax", () => {
    const content = toArray(
      ":laughing: This is a selection of 💩 emoji :) :ok_hand::skin-tone-6:"
    );
    expect(content).toMatchSnapshot();
  });
  test("consecutive same ascii emojis", () => {
    const content = toArray(":) :)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive different ascii emojis", () => {
    const content = toArray(":) :D");
    expect(content).toMatchSnapshot();
  });
  test("consecutive same ascii emojis without word-break", () => {
    const content = toArray(":):)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive different ascii emojis without word-break", () => {
    const content = toArray(":)<3");
    expect(content).toMatchSnapshot();
  });
  test("consecutive ascii and simple alias emojis without word-break", () => {
    const content = toArray(":):smile:");
    expect(content).toMatchSnapshot();
  });
  test("consecutive simple alias and ascii emojis that overlap", () => {
    const content = toArray(":smile:)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive simple alias and ascii emojis that overlap", () => {
    const content = toArray(":heart:o");
    expect(content).toMatchSnapshot();
  });
  test("consecutive simple alias and ascii emojis without word-break", () => {
    const content = toArray(":smile::)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive ascii and unicode emojis without word-break", () => {
    const content = toArray(":)💩");
    expect(content).toMatchSnapshot();
  });
  test("consecutive unicode and ascii emojis without word-break", () => {
    const content = toArray("💩:)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive ascii and non char word-break", () => {
    const content = toArray(":)a");
    expect(content).toMatchSnapshot();
  });
  test('urls not parsing ascii emoji ":/"', () => {
    const content = toArray("https://google.com");
    expect(content).toMatchSnapshot();
  });
  test("url and ascii emoji alias (no space)", () => {
    const content = toArray("https://google.com:)");
    expect(content).toMatchSnapshot();
  });
  test("url and emoji (no space)", () => {
    const content = toArray("https://google.com:heart:");
    expect(content).toMatchSnapshot();
  });
  test("url and ascii emoji alias (with space)", () => {
    const content = toArray("https://google.com :)");
    expect(content).toMatchSnapshot();
  });
  test("url and emoji (with space)", () => {
    const content = toArray("https://google.com :heart:");
    expect(content).toMatchSnapshot();
  });
  test("emoji and url (no space)", () => {
    const content = toArray(":)https://google.com");
    expect(content).toMatchSnapshot();
  });
  test("emoji and url (with space)", () => {
    const content = toArray(":) https://google.com");
    expect(content).toMatchSnapshot();
  });
  test("url including ascii emoji alias", () => {
    const content = toArray("https://foo:oops@example.com");
    expect(content).toMatchSnapshot();
  });
  test("single letter aliases", () => {
    const content = toArray(":v: :*::#: :o::x:");
    expect(content).toMatchSnapshot();
  });
  test("edge cases", () => {
    const content = toArray("<3: :1<3 <31:");
    expect(content).toMatchSnapshot();
  });
});
