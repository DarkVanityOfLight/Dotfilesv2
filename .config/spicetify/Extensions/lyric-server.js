var lyricDserver = (() => {
  // src/app.tsx
  var currentLyrics = null;
  var currentTime = null;
  var sockets = /* @__PURE__ */ new Map();
  var addresses = ["127.0.0.1:5001/ws"];
  function createConnection(address) {
    const socket = new WebSocket("ws://" + address);
    socket.addEventListener("open", (event) => {
      registerSocket(socket, address);
    });
    socket.onclose = function(event) {
      console.log("WebSocket is closed. Code: " + event.code);
      sockets.delete(address);
      setTimeout(function() {
        console.log("WebSocket reconnecting...");
        createConnection(address, socket);
      }, 1e3);
    };
  }
  function registerSocket(socket, address) {
    sockets.set(address, socket);
    sendCurrentLyrics(socket);
    sendCurrentTime(socket);
  }
  function sendCurrentLyrics(socket) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        lyrics: (currentLyrics == null ? void 0 : currentLyrics.length) ? currentLyrics : null
      }));
    } else {
      console.error("WebSocket connection not open.");
    }
  }
  function sendCurrentTime(socket) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        time: currentTime
      }));
    } else {
      console.error("WebSocket connection not open.");
    }
  }
  function getTrackId(trackURI) {
    return trackURI.split(":")[2];
  }
  function getCurrentTrackId() {
    var _a;
    if (((_a = Spicetify.Player.data) == null ? void 0 : _a.track) == void 0) {
      return null;
    }
    const trackURI = Spicetify.Player.data.track.uri;
    return getTrackId(trackURI);
  }
  function fetchLyrics(id) {
    const baseURL = "https://spclient.wg.spotify.com/lyrics/v1/track/";
    return Spicetify.CosmosAsync.get(baseURL + id).then((resp) => {
      const lyrics = resp.lines;
      return lyrics;
    }).catch((e) => {
      console.error(`Failed to fetch lyrics for track ${id}: ${e}`);
      return null;
    });
  }
  async function getCurrentTrackLyrics() {
    const trackId = getCurrentTrackId();
    if (trackId === null) {
      console.error("No track is currently playing.");
      return null;
    }
    return fetchLyrics(trackId);
  }
  function sendLyricsToAll(sockets2) {
    sockets2.forEach((socket) => {
      sendCurrentLyrics(socket);
    });
  }
  function sendTimeToAll(sockets2) {
    sockets2.forEach((socket) => {
      sendCurrentTime(socket);
    });
  }
  async function main() {
    var _a, _b;
    while (!Spicetify) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    while (((_b = (_a = Spicetify == null ? void 0 : Spicetify.Player) == null ? void 0 : _a.data) == null ? void 0 : _b.track) == null) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    currentLyrics = await getCurrentTrackLyrics();
    currentTime = Spicetify.Player.data.timestamp;
    addresses.forEach((address) => {
      createConnection(address);
    });
    Spicetify.Player.addEventListener("songchange", async () => {
      currentLyrics = await getCurrentTrackLyrics();
      sendLyricsToAll(sockets);
    });
    Spicetify.Player.addEventListener("onprogress", (event) => {
      if (event.data != currentTime) {
        currentTime = event.data;
        sendTimeToAll(sockets);
      }
    });
  }
  var app_default = main;

  // node_modules/spicetify-creator/dist/temp/index.jsx
  (async () => {
    await app_default();
  })();
})();
