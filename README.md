[![npm version](https://badge.fury.io/js/react-emoji-render.svg)](https://badge.fury.io/js/react-emoji-render) ![Node.js CI](https://github.com/tommoor/react-emoji-render/workflows/Node.js%20CI/badge.svg)

# react-emoji-render

Normalize and render emoji's the way your users expect.

- Supports unicode emoji characters
- Supports emoticons such as :) :x :/
- Supports slack-style emoji names such as `:smile:`
- Choose between native, twemoji, emojione or custom image sets.
- Add custom styles when text contains only emoji (to make it bigger, of course)

[Live Demo on CodeSandbox](https://codesandbox.io/s/tender-mclean-3glj1)

## Installation

Install with your favorite package manager:

```
npm install react-emoji-render --save
```

```
yarn add react-emoji-render
```

## Basic Usage

By default the component will normalize all of the different emoji notations to
native unicode characters.

```javascript
import Emoji from "react-emoji-render";

<Emoji text="This ❤️ sentence includes :+1: a variety of emoji types :)" />;
```

### Twemoji

[Twemoji](https://github.com/twitter/twemoji) is an emoji set designed by Twitter,
you can use the included `Twemoji` component to render emoji images in this style.

```javascript
import { Twemoji } from 'react-emoji-render';

<Twemoji text="This ❤️ sentence includes :+1: a variety of emoji types :)" />

// or, for svg images:
<Twemoji svg text="This ❤️ sentence includes :+1: a variety of emoji types :)" />
```

### Emojione

[Emojione](https://github.com/Ranks/emojione) is a great looking open source emoji set,
you can use the included `Emojione` component to render emoji images in this style.

```javascript
import { Emojione } from 'react-emoji-render';

<Emojione text="This ❤️ sentence includes :+1: a variety of emoji types :)" />

// or, for svg images:
<Emojione svg text="This ❤️ sentence includes :+1: a variety of emoji types :)" />

// or, for Emojione v4
<EmojioneV4 text="This ❤️ sentence includes :+1: a variety of emoji types :)" />
// note: only png supported -->
// https://github.com/emojione/emojione-assets/issues/2

// in v4 size prop can be set at 32, 64 (default) or 128
<EmojioneV4 size={32} text="This ❤️ sentence includes :+1: a variety of emoji types :)" />
```

## Advanced Usage

### Only Emoji

The className passed as the `onlyEmojiClassName` prop is added when the provided
text contains only three or less emoji characters. This allows you to add custom
styles in this scenario. For example:

```javascript
<Emoji text=":+1:" onlyEmojiClassName="make-emojis-large" />
```

### Array Output

If you want to do further processing on the output, for example parsing HTML then
it may be useful to not have the normalized emojis be wrapped in a component.

```javascript
import { toArray } from "react-emoji-render";

// content is an array of text and emoji components, you can now loop through this
// array and perform further processing. Avoid using `dangerouslySetInnerHTML`!
const content = toArray(
  "This ❤️ sentence includes :+1: a variety of emoji types :)"
);
```

Then, for example, you can parse all the text and emojis in a single string like the following:

```javascript
const parseEmojis = value => {
  const emojisArray = toArray(value);

  // toArray outputs React elements for emojis and strings for other
  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === "string") {
      return previous + current;
    }
    return previous + current.props.children;
  }, "");

  return newValue;
};

parseEmojis(":)hello"); // => "😃hello"
```

### Custom Images

If you wish to use a custom emoji set / location then you can pass options into
the props. One way to achive this is to create a wrapping component which provides
your options and exposes a new component, something like:

```javascript
import Emoji from "react-emoji-render";

function MyEmojiRenderer({ children, ...rest }) {
  const options = {
    baseUrl: "https://mycustom.cdn.com/emojis/",
    ext: "svg",
  };

  return <Emoji options={options} {...rest} />;
}
```

You can then use the new component:

```javascript
<MyEmojiRenderer text="This ❤️ sentence includes :+1: a variety of emoji types :)" />
```

## Contributing

### Emojis and aliases

If our [dataset](data/aliases.js) is missing some emoji, please open an issue specifying which one is missing. The library has a package script (`yarn update-aliases`) that makes it easy to update with the latest emojis at any time. You can directly do it yourself and open a PR as well.

If you would like to add a new alias to an existing emoji, please find the emoji in our [custom aliases](data/aliases/customAliases.json) file and add the alias to its array of aliases. If you have found a source of aliases that is being actively maintained and you would like to add it, please open an issue to discuss it.
