[![CircleCI](https://circleci.com/gh/tommoor/react-emoji.svg?style=svg)](https://circleci.com/gh/tommoor/react-emoji)

# react-emoji

Render emoji's the way your users expect.

- Supports unicode emoji characters
- Supports emoticons such as :) :x :/
- Supports slack-style emoji names such as `:smile:`
- Allows styling differently for strings that are only emoji, eg: to make them larger
- Choose between twemoji, emojione or custom image sets.


## Installation

Install with your favorite package manager:
```
npm install <PACKAGE-NAME> --save
yarn add <PACKAGE-NAME>
```

## Basic Usage

```javascript
import Emoji from '<PACKAGE-NAME>';

<Emoji>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Emoji>
```

### Twemoji

```javascript
import { Twemoji } from '<PACKAGE-NAME>';

<Twemoji>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Twemoji>
```

### Emojione

```javascript
import { Emojione } from '<PACKAGE-NAME>';

<Emojione>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Emojione>
```

## Advanced Usage

If you wish to use a custom emoji location then you can pass options into the prop.
I recommend creating a HOC which wraps your options and exposes a new component,
something like:

```javascript
import Emoji from '<PACKAGE-NAME>';

function MyEmojiRenderer({children, ...rest}) {
  const options = {
    baseUrl: 'https://mycustom.cdn.com/emojis/',
    ext: '.svg',
    size: ''
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
