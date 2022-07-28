"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireWildcard(require("../../src/index"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

[_index["default"], _index.Twemoji, _index.Emojione, _index.EmojioneV4].forEach(function (Component) {
  describe(Component.name, function () {
    test("strings with no emoji", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "Just some words"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("emoji with a single codepoint", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "This \u2764\uFE0F is \uD83D\uDC4C"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("emoji with a multiple codepoints", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "Great work \uD83D\uDC4D\uD83C\uDFFE \uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("simple aliases", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "This :smile: is nice :+1:"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("aliases containing underscores", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: ":stuck_out_tongue_winking_eye: wow"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("aliases with skin tone modifiers", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "Say hello to :woman::skin-tone-6:"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("ascii aliases", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "That's awesome :)"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("does nothing to unknown aliases", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "An :unknown: alias"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("a mixture of emoji syntax", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: ":laughing: This is a selection of \uD83D\uDCA9 emoji :) :ok_hand::skin-tone-6:"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("just emoticon should add onlyEmojiClassName", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: ":D",
        onlyEmojiClassName: "onlyEmojiClass"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("just emoji should add onlyEmojiClassName", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "\uD83D\uDE00",
        onlyEmojiClassName: "onlyEmojiClass"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("three emoji should add onlyEmojiClassName", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "\uD83D\uDE00\uD83D\uDC4D\uD83C\uDFFE\uD83D\uDC9E",
        onlyEmojiClassName: "onlyEmojiClass"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("four emoji should not add onlyEmojiClassName", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "\uD83D\uDC4B\uD83D\uDE00\uD83D\uDC4D\uD83C\uDFFE\uD83D\uDC9E",
        onlyEmojiClassName: "onlyEmojiClass"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("with svg prop", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "This :man::skin-tone-6: is \uD83D\uDC4C",
        svg: true
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("with size prop", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "This :man::skin-tone-6: is \uD83D\uDC4C",
        size: 32
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    test("composed emojis containing U+200D and U+FE0F chars", function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Component, {
        text: "\uD83D\uDC69\u200D\u2695\uFE0F"
      }));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
describe("toArray", function () {
  test("a mixture of emoji syntax", function () {
    var content = (0, _index.toArray)(":laughing: This is a selection of 💩 emoji :) :ok_hand::skin-tone-6:");
    expect(content).toMatchSnapshot();
  });
  test("consecutive same ascii emojis", function () {
    var content = (0, _index.toArray)(":) :)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive different ascii emojis", function () {
    var content = (0, _index.toArray)(":) :D");
    expect(content).toMatchSnapshot();
  });
  test("consecutive same ascii emojis without word-break", function () {
    var content = (0, _index.toArray)(":):)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive different ascii emojis without word-break", function () {
    var content = (0, _index.toArray)(":)<3");
    expect(content).toMatchSnapshot();
  });
  test("consecutive ascii and simple alias emojis without word-break", function () {
    var content = (0, _index.toArray)(":):smile:");
    expect(content).toMatchSnapshot();
  });
  test("consecutive simple alias and ascii emojis that overlap", function () {
    var content = (0, _index.toArray)(":smile:)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive simple alias and ascii emojis that overlap", function () {
    var content = (0, _index.toArray)(":heart:o");
    expect(content).toMatchSnapshot();
  });
  test("consecutive simple alias and ascii emojis without word-break", function () {
    var content = (0, _index.toArray)(":smile::)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive ascii and unicode emojis without word-break", function () {
    var content = (0, _index.toArray)(":)💩");
    expect(content).toMatchSnapshot();
  });
  test("consecutive unicode and ascii emojis without word-break", function () {
    var content = (0, _index.toArray)("💩:)");
    expect(content).toMatchSnapshot();
  });
  test("consecutive ascii and non char word-break", function () {
    var content = (0, _index.toArray)(":)a");
    expect(content).toMatchSnapshot();
  });
  test('urls not parsing ascii emoji ":/"', function () {
    var content = (0, _index.toArray)("https://google.com");
    expect(content).toMatchSnapshot();
  });
  test("url and ascii emoji alias (no space)", function () {
    var content = (0, _index.toArray)("https://google.com:)");
    expect(content).toMatchSnapshot();
  });
  test("url and emoji (no space)", function () {
    var content = (0, _index.toArray)("https://google.com:heart:");
    expect(content).toMatchSnapshot();
  });
  test("url and ascii emoji alias (with space)", function () {
    var content = (0, _index.toArray)("https://google.com :)");
    expect(content).toMatchSnapshot();
  });
  test("url and emoji (with space)", function () {
    var content = (0, _index.toArray)("https://google.com :heart:");
    expect(content).toMatchSnapshot();
  });
  test("emoji and url (no space)", function () {
    var content = (0, _index.toArray)(":)https://google.com");
    expect(content).toMatchSnapshot();
  });
  test("emoji and url (with space)", function () {
    var content = (0, _index.toArray)(":) https://google.com");
    expect(content).toMatchSnapshot();
  });
  test("url including ascii emoji alias", function () {
    var content = (0, _index.toArray)("https://foo:oops@example.com");
    expect(content).toMatchSnapshot();
  });
  test("single letter aliases", function () {
    var content = (0, _index.toArray)(":v: :*::#: :o::x:");
    expect(content).toMatchSnapshot();
  });
  test("edge cases", function () {
    var content = (0, _index.toArray)("<3: :1<3 <31:");
    expect(content).toMatchSnapshot();
  });
});