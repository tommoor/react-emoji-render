[![CircleCI](https://circleci.com/gh/tommoor/react-emoji.svg?style=svg)](https://circleci.com/gh/tommoor/react-emoji)

# react-emoji

Render emoji's the way your users expect.

- Supports unicode emoji characters
- Supports emoticons such as :) :x :/
- Supports slack-style emoji names such as `:smile:`
- Choose between native, twemoji, emojione or custom image sets.


## Installation

Install with your favorite package manager:
```
npm install <PACKAGE-NAME> --save
yarn add <PACKAGE-NAME>
```

## Basic Usage

By default the component will normalize all of the different emoji notations to
native unicode characters.

```javascript
import Emoji from '<PACKAGE-NAME>';

<Emoji>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Emoji>
```

### Twemoji

[Twemoji](https://github.com/twitter/twemoji) is an emoji set designed by Twitter,
you can use the included `Twemoji` component to render emoji images in this style.

```javascript
import { Twemoji } from '<PACKAGE-NAME>';

<Twemoji>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Twemoji>
```

### Emojione

[Emojione](https://github.com/Ranks/emojione) is a great looking open source emoji set,
you can use the included `Emojione` component to render emoji images in this style.

```javascript
import { Emojione } from '<PACKAGE-NAME>';

<Emojione>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</Emojione>
```

## Advanced Usage

If you wish to use a custom emoji set / location then you can pass options into
the prop. I recommend creating a HOC which wraps your options and exposes a new
component, something like:

```javascript
import Emoji from '<PACKAGE-NAME>';

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
