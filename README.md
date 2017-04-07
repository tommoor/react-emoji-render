[![npm version](https://badge.fury.io/js/react-emoji-render.svg)](https://badge.fury.io/js/react-emoji-render) [![CircleCI](https://circleci.com/gh/tommoor/react-emoji.svg?style=svg)](https://circleci.com/gh/tommoor/react-emoji)

# react-emoji-render

Normalize and render emoji's the way your users expect.

- Supports unicode emoji characters
- Supports emoticons such as :) :x :/
- Supports slack-style emoji names such as `:smile:`
- Choose between native, twemoji, emojione or custom image sets.


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
import Emoji from 'react-emoji-render';

<Emoji>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Emoji>
```

### Twemoji

[Twemoji](https://github.com/twitter/twemoji) is an emoji set designed by Twitter,
you can use the included `Twemoji` component to render emoji images in this style.

```javascript
import { Twemoji } from 'react-emoji-render';

<Twemoji>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Twemoji>

// or, for svg images:
<Twemoji svg>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Twemoji>
```

### Emojione

[Emojione](https://github.com/Ranks/emojione) is a great looking open source emoji set,
you can use the included `Emojione` component to render emoji images in this style.

```javascript
import { Emojione } from 'react-emoji-render';

<Emojione>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Emojione>

// or, for svg images:
<Emojione svg>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Emojione>
```

## Advanced Usage

If you wish to use a custom emoji set / location then you can pass options into
the prop. I recommend creating a HOC which wraps your options and exposes a new
component, something like:

```javascript
import Emoji from 'react-emoji-render';

function MyEmojiRenderer({children, ...rest}) {
  const options = {
    baseUrl: 'https://mycustom.cdn.com/emojis/',
    ext: 'svg'
  };

  return (
    <Emoji options={options} {...rest}>{children}</Emoji>
  );
}
```

You can then use the HOC like so:

```javascript
<MyEmojiRenderer>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</MyEmojiRenderer>
```
