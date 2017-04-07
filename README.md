[![CircleCI](https://circleci.com/gh/tommoor/react-emoji.svg?style=svg)](https://circleci.com/gh/tommoor/react-emoji)

# react-emoji

Render emoji's the way your users expect.

- Supports unicode emoji characters
- Supports emoticons such as :) :x :/
- Supports slack-style emoji names such as :smile:
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

## Advanced Usage

If you wish to use emojis other than twemoji then options are exposed, I recommend
creating a HOC which wraps your options and exposes a new component, something like:

```javascript
import Emoji from '<PACKAGE-NAME>';

function MyEmojiRenderer({children}) {
  const options = options || {
    baseUrl: 'https://twemoji.maxcdn.com/2/svg/',
    ext: '.svg',
    size: ''
  };

  return (
    <Emoji options={options}>{children}</Emoji>
  )
}
```

You can then use the HOC like so:

```javascript
<MyEmojiRenderer>
  This ❤️ sentence includes :+1: a variety of emoji types :)
</MyEmojiRenderer>
