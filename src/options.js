let protocol = "http";

if (typeof location !== "undefined" && location.protocol === "https:") {
  protocol = "https";
}

export const twemoji = {
  baseUrl: "//twemoji.maxcdn.com/2/",
  size: "72x72",
  ext: ".png"
};

export const emojione = {
  baseUrl: "//cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/",
  size: "",
  ext: ".png"
};

export default {
  ...twemoji,
  protocol
};
