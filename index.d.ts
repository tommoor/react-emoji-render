declare module 'react-emoji-render' {
  interface Options {
    protocol?: 'http' | 'https';
    baseUrl?: string;
    /** On the format WxH, like `72x72`. */
    size?: string;
    ext?: 'svg' | 'png';
    className?: string;
  }

  export interface BaseProps {
    /** Text to render to emoji. Can include unicode emojis, as well as :shortcode:
     * variants.
     */
    text?: string;
    props?: any;
    className?: string;
    /** The className passed as the onlyEmojiClassName prop is added when the provided text contains only three or less emoji characters. This allows you to add custom styles in this scenario. */
    onlyEmojiClassName?: string;
    options?: Options;
  }

  export interface SvgProps extends BaseProps {
    /** Use SVG for Twemoji and Emojion. Defaults to false (using .png instead). */
    svg?: boolean;
  }

  export interface SizeProps extends BaseProps {
    /** The pixels size of the emoji image */
    size?: 32 | 64 | 128;
  }

  type ReturnType = JSX.Element;

  /**
   * By default the component will normalize all of the different emoji
   * notations to native unicode characters.
   */
  export function Emoji(opts: SvgProps): ReturnType;

  /**
   * Twemoji is an emoji set designed by Twitter, you can use the included Twemoji
   * component to render emoji images in this style.
   *
   * @see https://github.com/twitter/twemoji
   */
  export function Twemoji(opts: SvgProps): ReturnType;

  /**
   * Emojione is a great looking open source emoji set, you can use
   * the included Emojione component to render emoji images in this style.
   *
   * @see https://github.com/Ranks/emojione
   */
  export function Emojione(opts: SvgProps): ReturnType;

  /**
   * Emojione is a great looking open source emoji set, you can use
   * the included Emojione component to render emoji images in this style.
   *
   * @see https://github.com/Ranks/emojione
   */
  export function EmojioneV4(opts: SizeProps): ReturnType;

  export default Emoji;

  /**
   * If you want to do further processing on the output, for example
   * parsing HTML then it may be useful to not have the normalized
   * emojis be wrapped in a component.
   */
  export function toArray(
    text: string,
    options?: Options
  ): React.ReactNodeArray;
}
