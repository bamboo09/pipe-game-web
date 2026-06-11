const canvas = document.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");

const welcomeScreen = document.querySelector("#welcomeScreen");
const startFirstBtn = document.querySelector("#startFirstBtn");
const levelSelect = document.querySelector("#levelSelect");
const backHomeBtn = document.querySelector("#backHomeBtn");
const levelLabel = document.querySelector("#levelLabel");
const costLabel = document.querySelector("#costLabel");
const targetLabel = document.querySelector("#targetLabel");
const manifoldLabel = document.querySelector("#manifoldLabel");
const mapLabel = document.querySelector("#mapLabel");
const bendLabel = document.querySelector("#bendLabel");
const officialCostLabel = document.querySelector("#officialCostLabel");
const placeManifoldBtn = document.querySelector("#placeManifoldBtn");
const hintBtn = document.querySelector("#hintBtn");
const solutionBtn = document.querySelector("#solutionBtn");
const solutionViewControls = document.querySelector("#solutionViewControls");
const viewBothBtn = document.querySelector("#viewBothBtn");
const viewOfficialBtn = document.querySelector("#viewOfficialBtn");
const viewPlayerBtn = document.querySelector("#viewPlayerBtn");
const assistModal = document.querySelector("#assistModal");
const acceptHintBtn = document.querySelector("#acceptHintBtn");
const declineHintBtn = document.querySelector("#declineHintBtn");
const equipmentModal = document.querySelector("#equipmentModal");
const equipmentOkBtn = document.querySelector("#equipmentOkBtn");
const levelNoticeModal = document.querySelector("#levelNoticeModal");
const levelNoticeTitle = document.querySelector("#levelNoticeTitle");
const levelNoticeCopy = document.querySelector("#levelNoticeCopy");
const levelNoticeOkBtn = document.querySelector("#levelNoticeOkBtn");
const clearModal = document.querySelector("#clearModal");
const clearModalCopy = document.querySelector("#clearModalCopy");
const clearSolutionBtn = document.querySelector("#clearSolutionBtn");
const clearNextBtn = document.querySelector("#clearNextBtn");
const stateCompanionCanvas = document.querySelector("#stateCompanionCanvas");
const successStateScene = document.querySelector("#successStateScene");
const successStateCanvas = document.querySelector("#successStateCanvas");
const successCostRoll = document.querySelector("#successCostRoll");
const clearStateCanvas = document.querySelector("#clearStateCanvas");
const pandaCelebration = document.querySelector("#pandaCelebration");
const pandaCelebrationImg = document.querySelector("#pandaCelebrationImg");
const pandaCelebrationLabel = document.querySelector("#pandaCelebrationLabel");
const lockedModal = document.querySelector("#lockedModal");
const lockedOkBtn = document.querySelector("#lockedOkBtn");
const deleteManifoldModal = document.querySelector("#deleteManifoldModal");
const deleteManifoldCopy = document.querySelector("#deleteManifoldCopy");
const cancelDeleteManifoldBtn = document.querySelector("#cancelDeleteManifoldBtn");
const confirmDeleteManifoldBtn = document.querySelector("#confirmDeleteManifoldBtn");
const toast = document.querySelector("#toast");
const undoBtn = document.querySelector("#undoBtn");
const resetBtn = document.querySelector("#resetBtn");
const finishBtn = document.querySelector("#finishBtn");
const nextBtn = document.querySelector("#nextBtn");

const W = canvas.width;
const H = canvas.height;
const DEFAULT_PLATFORM = { x: W - 120, y: H * 0.5, r: 24 };
const REAL_SIZE_M = 5000;
const COST_FLOWLINE_PER_M = 700;
const COST_TRUNKLINE_PER_M = 450;
const MANIFOLD_FIXED_COST = 1000000;
const MANIFOLD_MAX_LOAD = 10;
const MANIFOLD_RADIUS = 16;
const MANIFOLD_DELETE_RADIUS = 9;
const MANIFOLD_DELETE_REVEAL_MS = 1000;
const WELL_RADIUS = 9;
const PLATFORM_BODY_W = 56;
const PLATFORM_BODY_H = 76;
const PLATFORM_WELL_CLEARANCE = 78;
const SNAP_RADIUS = 28;
const MIN_POINT_GAP = 8;
const MAX_SLOPE_TAN = 0.25;
const MIN_BENDING_RADIUS_M = 150;
const DRAW_TERRAIN_CELL = 10;
const INPUT_SMOOTHING_PASSES = 2;
const STORE_SMOOTHING_PASSES = 0;
const SAVE_KEY = "pipeTycoonProgressV1";
const ENABLE_WEB_PANDA_GIFS = false;
const STATE_VIDEO_PATHS = {
  idle: "./src/assets/state/state0.mp4",
  success: "./src/assets/state/state1.mp4",
  clear: "./src/assets/state/state2.mp4",
};
const IDLE_LOOP_RESTART_OFFSET = 0.24;
const SUCCESS_COST_LOCK_PROGRESS = 0.72;
const ART_BASE = "./cocos/pipe-tycoon/assets/resources/textures/production";
const WEB_ART_PATHS = {
  maps: [`${ART_BASE}/maps/map_01.png`, `${ART_BASE}/maps/map_02.png`],
  equipment: {
    wellhead: `${ART_BASE}/equipment/wellhead.png`,
    manifold: `${ART_BASE}/equipment/manifold.png`,
    plem: `${ART_BASE}/equipment/plem.png`,
  },
  decorations: Array.from({ length: 16 }, (_, index) => `${ART_BASE}/decorations/deco_${String(index + 1).padStart(2, "0")}.png`),
  terrain: [
    Array.from({ length: 10 }, (_, index) => `${ART_BASE}/terrain/style1/obstacle_${String(index + 1).padStart(2, "0")}.png?v=20260601-restored`),
  ],
  fx: {
    lights: [`${ART_BASE}/fx/light/light_01.png`, `${ART_BASE}/fx/light/light_02.png`],
  },
};
const MAP_THEMES = [
  {
    name: "Sunlit Reef",
    deep: [4, 72, 146],
    mid: [18, 154, 196],
    high: [112, 213, 218],
    accent: "#ffe16c",
    wildlife: "reef",
  },
  {
    name: "Ship Grave",
    deep: [4, 58, 123],
    mid: [24, 132, 184],
    high: [105, 203, 213],
    accent: "#d4b46c",
    wildlife: "wreck",
  },
  {
    name: "Jelly Bloom",
    deep: [8, 68, 139],
    mid: [42, 150, 204],
    high: [136, 221, 228],
    accent: "#f7b8ff",
    wildlife: "jelly",
  },
  {
    name: "Blue Current",
    deep: [2, 52, 130],
    mid: [16, 126, 190],
    high: [102, 202, 226],
    accent: "#81dbff",
    wildlife: "fish",
  },
  {
    name: "Coral Garden",
    deep: [6, 64, 132],
    mid: [18, 142, 190],
    high: [116, 212, 206],
    accent: "#ffb36f",
    wildlife: "reef",
  },
  {
    name: "Cobalt Basin",
    deep: [3, 50, 128],
    mid: [18, 116, 180],
    high: [120, 207, 224],
    accent: "#73cfff",
    wildlife: "fish",
  },
  {
    name: "Lost Lagoon",
    deep: [6, 62, 134],
    mid: [29, 139, 190],
    high: [128, 214, 222],
    accent: "#ffe16c",
    wildlife: "wreck",
  },
];

let campaignLevels = [];
let levelIndex = 0;
let state = null;
let drawing = null;
let mode = "pipe";
let pendingClearAfterEquipment = false;
let pendingDeleteManifoldId = null;
let revealedDeleteManifoldId = null;
let deleteRevealCandidateId = null;
let deleteRevealTimer = null;
let renderQueued = false;
let visualTicker = null;
let pandaCelebrations = [];
let webArt = null;
let stateCompanionPlayer = null;
let successStatePlayer = null;
let clearStatePlayer = null;
let pendingSuccessClearCost = null;
let successCostRollState = null;
const levelFailCounts = new Map();
const seenNoticeLevels = new Set();
const seenUnlockLevels = new Set();

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

async function loadWebArt() {
  const [maps, decorations, terrain, equipmentEntries, fxEntries] = await Promise.all([
    Promise.all(WEB_ART_PATHS.maps.map(loadImage)),
    Promise.all(WEB_ART_PATHS.decorations.map(loadImage)),
    Promise.all(WEB_ART_PATHS.terrain.map((style) => Promise.all(style.map(loadImage)))),
    Promise.all(Object.entries(WEB_ART_PATHS.equipment).map(async ([key, path]) => [key, await loadImage(path)])),
    Promise.all(Object.entries(WEB_ART_PATHS.fx).map(async ([key, paths]) => [key, (await Promise.all(paths.map(loadImage))).filter(Boolean)])),
  ]);

  webArt = {
    maps: maps.filter(Boolean),
    decorations: decorations.filter(Boolean),
    terrain: terrain.map((style) => style.filter(Boolean)),
    equipment: Object.fromEntries(equipmentEntries.filter(([, image]) => image)),
    fx: Object.fromEntries(fxEntries),
  };
}

function setHidden(element, hidden) {
  if (!element) return;
  element.hidden = hidden;
  element.style.display = hidden ? "none" : "";
}

function createStateVideoPlayer(canvasElement, options = {}) {
  if (!canvasElement) return null;
  const playerCanvas = canvasElement;
  const playerCtx = playerCanvas.getContext("2d", { willReadFrequently: true });
  const sourceVideo = document.createElement("video");
  sourceVideo.muted = true;
  sourceVideo.playsInline = true;
  sourceVideo.preload = "auto";
  sourceVideo.crossOrigin = "anonymous";

  const player = {
    current: "",
    loop: true,
    raf: 0,
    onEnded: null,
    seekingLoop: false,
    load(src) {
      if (!src || this.current === src) return;
      this.current = src;
      sourceVideo.src = src;
      sourceVideo.load();
    },
    play(src, loop = true, onEnded = null) {
      if (!src) return;
      this.loop = loop;
      this.onEnded = onEnded;
      this.seekingLoop = false;
      sourceVideo.loop = loop && !options.loopRestartOffset;
      if (this.current !== src) {
        this.load(src);
      }
      sourceVideo.currentTime = 0;
      sourceVideo.play().catch(() => {});
      this.start();
    },
    stop() {
      window.cancelAnimationFrame(this.raf);
      this.raf = 0;
      this.onEnded = null;
      this.seekingLoop = false;
      sourceVideo.pause();
      playerCtx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    },
    start() {
      if (this.raf) return;
      const draw = () => {
        this.raf = window.requestAnimationFrame(draw);
        if (this.loop && options.loopRestartOffset && sourceVideo.duration) {
          const restartAt = Math.max(0, sourceVideo.duration - options.loopRestartOffset);
          if (sourceVideo.currentTime >= restartAt) {
            this.seekingLoop = true;
            sourceVideo.currentTime = 0.033;
            sourceVideo.play().catch(() => {});
            return;
          }
          if (this.seekingLoop) {
            if (sourceVideo.readyState < 2 || sourceVideo.currentTime > 0.09) return;
            this.seekingLoop = false;
          }
        }
        drawStateVideoFrame(sourceVideo, playerCanvas, playerCtx, options);
        if (options.onFrame) options.onFrame(sourceVideo);
      };
      draw();
    },
  };

  sourceVideo.addEventListener("ended", () => {
    if (player.loop) return;
    const onEnded = player.onEnded;
    player.onEnded = null;
    if (onEnded) onEnded();
  });
  sourceVideo.addEventListener("error", () => {
    if (player.loop) return;
    const onEnded = player.onEnded;
    player.onEnded = null;
    if (onEnded) onEnded();
  });
  return player;
}

function drawStateVideoFrame(video, targetCanvas, targetCtx, options = {}) {
  const rect = targetCanvas.getBoundingClientRect();
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const cssWidth = rect.width || targetCanvas.clientWidth || targetCanvas.width;
  const cssHeight = rect.height || targetCanvas.clientHeight || targetCanvas.height;
  const nextW = Math.max(1, Math.round(cssWidth * dpr));
  const nextH = Math.max(1, Math.round(cssHeight * dpr));
  if (targetCanvas.width !== nextW || targetCanvas.height !== nextH) {
    targetCanvas.width = nextW;
    targetCanvas.height = nextH;
  }

  targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  if (!video.videoWidth || !video.videoHeight || video.readyState < 2) return;

  const scale = Math.min(targetCanvas.width / video.videoWidth, targetCanvas.height / video.videoHeight) * (options.scale || 1);
  const dw = video.videoWidth * scale;
  const dh = video.videoHeight * scale;
  const dx = (targetCanvas.width - dw) / 2;
  const dy = targetCanvas.height - dh;
  targetCtx.drawImage(video, dx, dy, dw, dh);

  const frame = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
  const pixels = frame.data;
  removeConnectedMatte(pixels, targetCanvas.width, targetCanvas.height);
  targetCtx.putImageData(frame, 0, 0);
}

function isStateVideoMattePixel(pixels, pixelIndex) {
  const offset = pixelIndex * 4;
  const r = pixels[offset];
  const g = pixels[offset + 1];
  const b = pixels[offset + 2];
  const a = pixels[offset + 3];
  if (a < 8) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max - min;
  return max > 150 && min > 128 && saturation < 30;
}

function removeConnectedMatte(pixels, width, height) {
  const total = width * height;
  const removed = new Uint8Array(total);
  const queue = [];

  const enqueue = (pixelIndex) => {
    if (pixelIndex < 0 || pixelIndex >= total || removed[pixelIndex]) return;
    if (!isStateVideoMattePixel(pixels, pixelIndex)) return;
    removed[pixelIndex] = 1;
    queue.push(pixelIndex);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  for (let head = 0; head < queue.length; head += 1) {
    const pixelIndex = queue[head];
    const x = pixelIndex % width;
    if (x > 0) enqueue(pixelIndex - 1);
    if (x < width - 1) enqueue(pixelIndex + 1);
    if (pixelIndex >= width) enqueue(pixelIndex - width);
    if (pixelIndex < total - width) enqueue(pixelIndex + width);
  }

  for (let pixelIndex = 0; pixelIndex < total; pixelIndex += 1) {
    if (!removed[pixelIndex]) continue;
    pixels[pixelIndex * 4 + 3] = 0;
  }

  for (let pixelIndex = 0; pixelIndex < total; pixelIndex += 1) {
    if (removed[pixelIndex] || !isStateVideoMattePixel(pixels, pixelIndex)) continue;
    const x = pixelIndex % width;
    const touchesRemoved =
      (x > 0 && removed[pixelIndex - 1]) ||
      (x < width - 1 && removed[pixelIndex + 1]) ||
      (pixelIndex >= width && removed[pixelIndex - width]) ||
      (pixelIndex < total - width && removed[pixelIndex + width]);
    if (!touchesRemoved) continue;
    const offset = pixelIndex * 4;
    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max - min;
    const matteStrength = Math.min(1, Math.max(0, (max - 150) / 96)) * Math.min(1, Math.max(0, (30 - saturation) / 30));
    pixels[offset + 3] = Math.round(pixels[offset + 3] * (1 - matteStrength * 0.64));
  }
}

function initStateVideoPlayers() {
  stateCompanionPlayer = createStateVideoPlayer(stateCompanionCanvas, { scale: 1.06, loopRestartOffset: IDLE_LOOP_RESTART_OFFSET });
  successStatePlayer = createStateVideoPlayer(successStateCanvas, { scale: 1.02, onFrame: updateSuccessCostRoll });
  clearStatePlayer = createStateVideoPlayer(clearStateCanvas, { scale: 1.08 });
  successStatePlayer?.load(STATE_VIDEO_PATHS.success);
  clearStatePlayer?.load(STATE_VIDEO_PATHS.clear);
  stateCompanionPlayer?.play(STATE_VIDEO_PATHS.idle, true);
}

function playIdleStateVideo() {
  stateCompanionPlayer?.play(STATE_VIDEO_PATHS.idle, true);
}

function playSuccessStateVideo() {
  if (!successStatePlayer) {
    finishSuccessStateVideo();
    return;
  }
  startSuccessCostRoll(pendingSuccessClearCost || 0);
  setHidden(successStateScene, false);
  setHidden(stateCompanionCanvas?.parentElement, true);
  successStatePlayer?.play(STATE_VIDEO_PATHS.success, false, finishSuccessStateVideo);
}

function finishSuccessStateVideo() {
  lockSuccessCostRoll();
  setHidden(successStateScene, true);
  successStatePlayer?.stop();
  setHidden(stateCompanionCanvas?.parentElement, false);
  playIdleStateVideo();
  render();

  const cost = pendingSuccessClearCost;
  pendingSuccessClearCost = null;
  if (cost == null) return;

  if (state.unlock && equipmentModal && !state.unlockShown && !seenUnlockLevels.has(state.id)) {
    state.unlockShown = true;
    seenUnlockLevels.add(state.id);
    pendingClearAfterEquipment = true;
    setHidden(equipmentModal, false);
    return;
  }
  showClearModal(cost);
}

function playClearModalStateVideo() {
  clearStatePlayer?.play(STATE_VIDEO_PATHS.clear, true);
}

function stopClearModalStateVideo() {
  clearStatePlayer?.stop();
}

function cancelSuccessStateSequence() {
  pendingSuccessClearCost = null;
  successCostRollState = null;
  setHidden(successStateScene, true);
  successStatePlayer?.stop();
  setHidden(stateCompanionCanvas?.parentElement, false);
}

function startSuccessCostRoll(targetCost) {
  successCostRollState = {
    target: targetCost,
    start: performance.now(),
    locked: false,
  };
  if (successCostRoll) successCostRoll.textContent = formatMoney(0);
}

function updateSuccessCostRoll(video) {
  if (!successCostRollState || !successCostRoll) return;
  const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
  const progress = Math.max(0, Math.min(1, video.currentTime / duration));
  if (progress >= SUCCESS_COST_LOCK_PROGRESS) {
    lockSuccessCostRoll();
    return;
  }

  const elapsed = (performance.now() - successCostRollState.start) / 1000;
  const spin = (Math.sin(elapsed * 15.5) + 1) * 0.5;
  const ramp = Math.min(1, progress / SUCCESS_COST_LOCK_PROGRESS);
  const base = successCostRollState.target * (0.18 + ramp * 0.82);
  const jitter = successCostRollState.target * (0.18 * (1 - ramp)) * spin;
  successCostRoll.textContent = formatMoney(Math.min(successCostRollState.target * 1.14, base + jitter));
}

function lockSuccessCostRoll() {
  if (!successCostRollState || !successCostRoll) return;
  successCostRollState.locked = true;
  successCostRoll.textContent = formatMoney(successCostRollState.target);
}

function savedUnlockedLevel() {
  const raw = Number.parseInt(window.localStorage.getItem(SAVE_KEY) || "0", 10);
  return Number.isFinite(raw) ? Math.max(0, raw) : 0;
}

function saveUnlockedLevel(index) {
  const next = Math.max(savedUnlockedLevel(), index);
  window.localStorage.setItem(SAVE_KEY, String(next));
}

function mulberry32(seed) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function segmentPointDistance(a, b, p) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function pathTouchesObstacle(points) {
  for (let i = 1; i < points.length; i += 1) {
    for (const obstacle of state.obstacles) {
      if (segmentPointDistance(points[i - 1], points[i], obstacle) < obstacle.r + 6) return true;
    }
    for (const cell of state.blockedCells) {
      if (segmentIntersectsRect(points[i - 1], points[i], cell)) return true;
    }
  }
  return false;
}

function segmentIntersectsRect(a, b, rect) {
  const samples = Math.max(4, Math.ceil(distance(a, b) / 10));
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h) return true;
  }
  return false;
}

function toReal(point) {
  return {
    x: (point.x / W) * REAL_SIZE_M,
    y: (point.y / H) * REAL_SIZE_M,
  };
}

function terrainHeight(point) {
  const terrain = state.terrain;
  if (terrain.grid && terrain.grid.length > 1) return terrainGridHeight(point, terrain);
  const x = point.x / W;
  const y = point.y / H;
  const base = terrain.minZ + (terrain.maxZ - terrain.minZ) * (0.25 * x + 0.35 * y);
  const ridge = terrain.ridgeAmp * Math.exp(-((y - (0.32 + 0.12 * Math.sin(2 * Math.PI * x))) ** 2) / 0.01);
  const hill = terrain.hillAmp * Math.exp(-((x - 0.62) ** 2 + (y - 0.42) ** 2) / 0.035);
  const valley = -terrain.valleyAmp * Math.exp(-((x - 0.42) ** 2) / 0.018);
  const rough = terrain.roughAmp * Math.sin((x * 5.7 + terrain.phase) * Math.PI) * Math.sin((y * 4.6 - terrain.phase) * Math.PI);
  return base + ridge + hill + valley + rough;
}

function terrainGridHeight(point, terrain) {
  const rows = terrain.grid.length;
  const cols = terrain.grid[0].length;
  const gx = Math.max(0, Math.min(cols - 1, (point.x / W) * (cols - 1)));
  const gy = Math.max(0, Math.min(rows - 1, (point.y / H) * (rows - 1)));
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const x1 = Math.min(cols - 1, x0 + 1);
  const y1 = Math.min(rows - 1, y0 + 1);
  const tx = gx - x0;
  const ty = gy - y0;
  const a = terrain.grid[y0][x0] * (1 - tx) + terrain.grid[y0][x1] * tx;
  const b = terrain.grid[y1][x0] * (1 - tx) + terrain.grid[y1][x1] * tx;
  return a * (1 - ty) + b * ty;
}

function terrainSlopePenalty(a, b) {
  const ar = toReal(a);
  const br = toReal(b);
  const dxy = Math.hypot(br.x - ar.x, br.y - ar.y);
  if (dxy <= 1e-6) return 0;
  const dz = terrainHeight(b) - terrainHeight(a);
  const slope = Math.abs(dz) / dxy;
  return slope > MAX_SLOPE_TAN ? (slope - MAX_SLOPE_TAN) * dxy * 180000 : 0;
}

function bendingRadiusM(a, b, c) {
  const ar = toReal(a);
  const br = toReal(b);
  const cr = toReal(c);
  const ab = Math.hypot(ar.x - br.x, ar.y - br.y);
  const bc = Math.hypot(br.x - cr.x, br.y - cr.y);
  const ca = Math.hypot(cr.x - ar.x, cr.y - ar.y);
  const area2 = Math.abs((br.x - ar.x) * (cr.y - ar.y) - (br.y - ar.y) * (cr.x - ar.x));
  if (ab < 60 || bc < 60 || area2 < 1e-6) return Infinity;
  return (ab * bc * ca) / (2 * area2);
}

function minBendingRadius(points) {
  const simplified = simplifyVisualPath(points, 18);
  let minRadius = Infinity;
  for (let i = 1; i < simplified.length - 1; i += 1) {
    minRadius = Math.min(minRadius, bendingRadiusM(simplified[i - 1], simplified[i], simplified[i + 1]));
  }
  return minRadius;
}

function violatesBendingRadius(points) {
  return minBendingRadius(smoothPath(points, INPUT_SMOOTHING_PASSES)) < state.costModel.minBendingRadiusM;
}

function simplifyVisualPath(points, minGap) {
  if (points.length <= 2) return points;
  const out = [points[0]];
  for (let i = 1; i < points.length - 1; i += 1) {
    if (distance(out[out.length - 1], points[i]) >= minGap) out.push(points[i]);
  }
  out.push(points[points.length - 1]);
  return out;
}

function smoothPath(points, passes = 1) {
  if (points.length <= 2) return points;
  let current = points.map((point) => ({ x: point.x, y: point.y }));
  for (let pass = 0; pass < passes; pass += 1) {
    const next = [current[0]];
    for (let i = 0; i < current.length - 1; i += 1) {
      const a = current[i];
      const b = current[i + 1];
      next.push({ x: a.x * 0.72 + b.x * 0.28, y: a.y * 0.72 + b.y * 0.28 });
      next.push({ x: a.x * 0.28 + b.x * 0.72, y: a.y * 0.28 + b.y * 0.72 });
    }
    next.push(current[current.length - 1]);
    current = next;
  }
  return current;
}

function polylineLength3d(points) {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = toReal(points[i - 1]);
    const b = toReal(points[i]);
    const dxy = Math.hypot(b.x - a.x, b.y - a.y);
    const dz = terrainHeight(points[i]) - terrainHeight(points[i - 1]);
    total += Math.hypot(dxy, dz);
  }
  return total;
}

function pipeUnitCost(pipe) {
  return pipe.sourceKind === "well" ? state.costModel.flowlinePerM : state.costModel.trunklinePerM;
}

function pipeCost(pipe) {
  const unit = pipeUnitCost(pipe);
  const raw = polylineLength3d(pipe.points) * unit;
  const slopePenalty = pipe.points.reduce((sum, point, index) => {
    if (index === 0) return sum;
    return sum + terrainSlopePenalty(pipe.points[index - 1], point);
  }, 0);
  return raw + slopePenalty;
}

function makeLevel(index) {
  if (campaignLevels.length > 0) return makeLevelFromData(campaignLevels[index % campaignLevels.length], index);

  const rand = mulberry32(9409 + index * 131);
  const wells = [];
  const obstacles = [];
  const wellCount = Math.min(4 + index, 12);
  const obstacleCount = Math.min(4 + index, 13);

  for (let i = 0; i < obstacleCount; i += 1) {
    obstacles.push({
      id: i,
      x: 280 + rand() * (W - 620),
      y: 90 + rand() * (H - 180),
      r: 40 + rand() * (54 + index * 3),
    });
  }

  while (wells.length < wellCount) {
    const candidate = {
      id: wells.length,
      x: 82 + rand() * 280,
      y: 72 + rand() * (H - 144),
      r: WELL_RADIUS,
    };
    if (isClearPoint(candidate, obstacles, 62) && wells.every((well) => distance(well, candidate) > 86)) {
      wells.push(candidate);
    }
  }

  const terrain = makeTerrain(index, rand);
  const maxManifolds = Math.min(2 + Math.floor(index / 2), 5);
  return buildState(index, {
    level_id: `practice-${index + 1}`,
    wells,
    obstacles,
    terrain,
    max_manifolds: maxManifolds,
    target_cost: estimateTarget(wells, obstacles, terrain, maxManifolds, index),
    official_solution: null,
  });
}

function makeLevelFromData(level, index) {
  return buildState(index, {
    ...level,
    obstacles: level.obstacles || level.hazards || [],
    terrain: level.terrain || makeTerrain(index, mulberry32(7070 + index)),
    max_manifolds: level.max_manifolds || level.manifold_limit || Math.min(2 + Math.floor(index / 2), 5),
  });
}

function makeTerrain(index, rand) {
  return {
    minZ: -1500,
    maxZ: -500,
    ridgeAmp: 70 + rand() * (65 + index * 3),
    hillAmp: 90 + rand() * (100 + index * 4),
    valleyAmp: 80 + rand() * (120 + index * 5),
    roughAmp: 28 + rand() * (45 + index * 2),
    phase: rand() * 2,
  };
}

function buildState(index, level) {
  const platform = { ...(level.platform || DEFAULT_PLATFORM), r: DEFAULT_PLATFORM.r };
  const wells = nudgeWellsFromPlatform(
    level.wells.map((well, idx) => ({ id: idx, x: well.x, y: well.y, r: WELL_RADIUS, connected: false })),
    platform,
  );
  const levelState = {
    index,
    id: level.level_id,
    wells,
    manifolds: [],
    obstacles: level.obstacles.map((item, idx) => ({ id: idx, x: item.x, y: item.y, r: item.r })),
    blockedCells: level.blocked_cells || [],
    platform,
    intro: level.intro || null,
    notice: level.notice || null,
    noticeTitle: level.notice_title || "New rule",
    unlock: level.unlock || null,
    terrain: level.terrain,
    theme: MAP_THEMES[index % MAP_THEMES.length],
    maxManifolds: level.max_manifolds,
    costModel: {
      flowlinePerM: level.cost_model?.flowline_per_m ?? COST_FLOWLINE_PER_M,
      trunklinePerM: level.cost_model?.trunkline_per_m ?? COST_TRUNKLINE_PER_M,
      manifoldFixed: level.cost_model?.manifold_fixed ?? MANIFOLD_FIXED_COST,
      manifoldMaxLoad: level.cost_model?.manifold_max_load ?? MANIFOLD_MAX_LOAD,
      minBendingRadiusM: level.cost_model?.min_bending_radius_m ?? MIN_BENDING_RADIUS_M,
    },
    pipes: [],
    target: level.target_cost,
    officialCost: level.official_cost || null,
    officialSolution: level.official_solution || null,
    generationSource: level.generation_source || "heuristic_dev",
    failCount: levelFailCounts.get(index) || 0,
    assistUnlocked: false,
    assistPrompted: false,
    showHint: false,
    showSolution: false,
    solutionView: "both",
    noticeShown: false,
    unlockShown: false,
    settled: false,
    history: [],
    backgroundCache: null,
  };
  levelState.decorations = generateDecorationLayout(levelState);
  levelState.environmentFx = generateEnvironmentFxLayout(levelState);
  return levelState;
}

function nudgeWellsFromPlatform(wells, platform) {
  return wells.map((well, index) => {
    const dx = well.x - platform.x;
    const dy = well.y - platform.y;
    const current = Math.hypot(dx, dy);
    if (current >= PLATFORM_WELL_CLEARANCE) return well;

    const angle = current > 1 ? Math.atan2(dy, dx) : (index / Math.max(1, wells.length)) * Math.PI * 2;
    const radius = PLATFORM_WELL_CLEARANCE + (index % 3) * 8;
    return {
      ...well,
      x: Math.max(28, Math.min(W - 28, platform.x + Math.cos(angle) * radius)),
      y: Math.max(28, Math.min(H - 28, platform.y + Math.sin(angle) * radius)),
    };
  });
}

function isClearPoint(point, obstacles, margin) {
  return obstacles.every((obstacle) => distance(point, obstacle) > obstacle.r + margin);
}

function expandedRectContains(rect, point, margin) {
  return (
    point.x >= rect.x - margin &&
    point.x <= rect.x + rect.w + margin &&
    point.y >= rect.y - margin &&
    point.y <= rect.y + rect.h + margin
  );
}

function distanceToPath(point, path) {
  if (!Array.isArray(path) || path.length < 2) return Infinity;
  let best = Infinity;
  for (let index = 1; index < path.length; index += 1) {
    best = Math.min(best, segmentPointDistance(path[index - 1], path[index], point));
  }
  return best;
}

function generateDecorationLayout(levelState) {
  const artCount = webArt?.decorations?.length || 0;
  if (artCount === 0) return [];

  const rand = mulberry32(17000 + levelState.index * 811);
  const count = Math.min(7, Math.max(4, 4 + (levelState.index % 4)));
  const result = [];
  const officialPaths = levelState.officialSolution?.paths || [];
  const order = Array.from({ length: artCount }, (_, index) => index);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  let attempts = 0;
  while (result.length < count && attempts < 420) {
    attempts += 1;
    const scale = 0.34 + rand() * 0.32;
    const radius = 34 + scale * 54;
    const candidate = {
      artIndex: order[result.length % order.length],
      x: 55 + rand() * (W - 110),
      y: 55 + rand() * (H - 110),
      w: 80 + scale * 120,
      h: 56 + scale * 92,
      rotation: (rand() - 0.5) * 0.18,
      alpha: 0.46 + rand() * 0.18,
      radius,
    };

    const nearWell = levelState.wells.some((well) => distance(well, candidate) < radius + 66);
    const nearPlatform = distance(levelState.platform, candidate) < radius + 96;
    const nearObstacle = levelState.obstacles.some((obstacle) => distance(obstacle, candidate) < radius + obstacle.r + 72);
    const nearBlocked = levelState.blockedCells.some((cell) => expandedRectContains(cell, candidate, radius + 48));
    const nearOfficial = officialPaths.some((path) => distanceToPath(candidate, path) < radius + 46);
    const nearDecoration = result.some((item) => distance(item, candidate) < radius + item.radius + 38);

    if (!nearWell && !nearPlatform && !nearObstacle && !nearBlocked && !nearOfficial && !nearDecoration) {
      result.push(candidate);
    }
  }

  return result;
}

function generateEnvironmentFxLayout(levelState) {
  const rand = mulberry32(26000 + levelState.index * 977);
  return { lightOffset: rand() * 1000 };
}

function estimateTarget(wells, obstacles, terrain, maxManifolds, index) {
  const previousState = state;
  state = { terrain, obstacles };
  const rand = mulberry32(6000 + index * 31);
  const hubs = [];
  while (hubs.length < Math.max(1, Math.min(maxManifolds, Math.ceil(wells.length / 4)))) {
    const candidate = { x: 430 + rand() * 420, y: 80 + rand() * (H - 160), r: MANIFOLD_RADIUS };
    if (isClearPoint(candidate, obstacles, 76) && hubs.every((hub) => distance(hub, candidate) > 140)) hubs.push(candidate);
  }
  let total = hubs.length * MANIFOLD_FIXED_COST;
  wells.forEach((well) => {
    const hub = hubs.reduce((best, item) => (distance(well, item) < distance(well, best) ? item : best), hubs[0]);
    total += pipeCost({ points: [well, hub], sourceKind: "well" });
  });
  hubs.forEach((hub) => {
    total += pipeCost({ points: [hub, platformPoint()], sourceKind: "manifold" });
  });
  state = previousState;
  return total * (1.22 - Math.min(index, 8) * 0.015);
}

function activeManifoldCount() {
  return state.manifolds.length;
}

function platformPoint() {
  return state?.platform || DEFAULT_PLATFORM;
}

function totalCost() {
  const pipeTotal = state.pipes.reduce((sum, pipe) => sum + pipeCost(pipe), 0);
  return pipeTotal + activeManifoldCount() * state.costModel.manifoldFixed;
}

function manifoldLoads() {
  const loads = new Map(state.manifolds.map((node) => [node.id, 0]));
  state.pipes.forEach((pipe) => {
    if (pipe.sourceKind === "manifold") {
      loads.set(pipe.sourceId, (loads.get(pipe.sourceId) || 0) + 1);
    }
    if (pipe.targetKind === "manifold") {
      loads.set(pipe.targetId, (loads.get(pipe.targetId) || 0) + 1);
    }
  });
  return loads;
}

function addEdge(graph, a, b) {
  if (!graph.has(a)) graph.set(a, new Set());
  if (!graph.has(b)) graph.set(b, new Set());
  graph.get(a).add(b);
  graph.get(b).add(a);
}

function reachableNodesFromPlatform() {
  const graph = new Map();
  state.pipes.forEach((pipe) => {
    const sourceNode = pipe.sourceKind === "well" ? `well:${pipe.sourceId}` : `manifold:${pipe.sourceId}`;
    const targetNode = pipe.targetKind === "platform" ? "platform" : `manifold:${pipe.targetId}`;
    addEdge(graph, sourceNode, targetNode);
  });

  const visited = new Set();
  const queue = ["platform"];
  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    for (const next of graph.get(current) || []) {
      if (!visited.has(next)) queue.push(next);
    }
  }
  return visited;
}

function connectedWellCount() {
  const reachable = reachableNodesFromPlatform();
  return state.wells.filter((well) => reachable.has(`well:${well.id}`)).length;
}

function findWell(point) {
  return state.wells.find((well) => !well.connected && distance(well, point) < SNAP_RADIUS);
}

function findStartNode(point) {
  const well = findWell(point);
  if (well) return { kind: "well", id: well.id, point: well };

  const manifold = state.manifolds.find((node) => distance(node, point) < node.r + SNAP_RADIUS);
  if (manifold) return { kind: "manifold", id: manifold.id, point: manifold };

  return null;
}

function findSnapTarget(point) {
  const platform = platformPoint();
  if (distance(platform, point) < platform.r + SNAP_RADIUS) return { kind: "platform", point: platform };

  const manifold = state.manifolds.find((node) => distance(node, point) < node.r + SNAP_RADIUS);
  if (manifold) return { kind: "manifold", point: manifold, id: manifold.id };

  return null;
}

function manifoldDeletePoint(node) {
  return { x: node.x + 23, y: node.y - 18 };
}

function findManifoldDeleteHit(point) {
  return state.manifolds.find(
    (node) => node.id === revealedDeleteManifoldId && distance(manifoldDeletePoint(node), point) <= MANIFOLD_DELETE_RADIUS + 5,
  );
}

function findManifoldHover(point) {
  return state.manifolds.find((node) => distance(manifoldDeletePoint(node), point) <= 22);
}

function isManifoldFull(manifoldId) {
  return (manifoldLoads().get(manifoldId) || 0) >= state.costModel.manifoldMaxLoad;
}

function toCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * W,
    y: ((event.clientY - rect.top) / rect.height) * H,
  };
}

function formatMoney(value) {
  return `$${(value / 1000000).toFixed(2)}M`;
}

function updateHud() {
  if (!state) return;
  const campaignTotal = campaignLevels.length > 0 ? `/${campaignLevels.length}` : "";
  levelLabel.textContent = `Level ${state.index + 1}${campaignTotal}  Wells ${connectedWellCount()}/${state.wells.length}`;
  costLabel.textContent = formatMoney(totalCost());
  targetLabel.textContent = `Target ${formatMoney(state.target)}`;
  mapLabel.textContent = `${state.theme?.name || "Subsea Map"}  ${REAL_SIZE_M}m x ${REAL_SIZE_M}m`;
  bendLabel.textContent = `Minimum bend radius ${state.costModel.minBendingRadiusM}m`;
  const priceText =
    state.maxManifolds > 0
      ? `F ${state.costModel.flowlinePerM}/m  T ${state.costModel.trunklinePerM}/m  M ${formatMoney(state.costModel.manifoldFixed)}`
      : `Rmin ${state.costModel.minBendingRadiusM}m`;
  manifoldLabel.textContent = state.maxManifolds > 0 ? `M ${activeManifoldCount()}/${state.maxManifolds}  ${priceText}` : "Direct tieback only";
  officialCostLabel.textContent = state.officialCost ? `Official ${formatMoney(state.officialCost)}` : "Official n/a";
  setHidden(officialCostLabel, !state.showSolution || !state.officialCost);
  placeManifoldBtn.classList.toggle("active", mode === "place-manifold");
  setHidden(placeManifoldBtn, state.maxManifolds <= 0);
  setHidden(hintBtn, !state.assistUnlocked || !hasManifoldHint());
  setHidden(solutionBtn, !state.assistUnlocked || !hasSolverSolution());
  setHidden(solutionViewControls, !state.showSolution);
  viewBothBtn.classList.toggle("active", state.solutionView === "both");
  viewOfficialBtn.classList.toggle("active", state.solutionView === "official");
  viewPlayerBtn.classList.toggle("active", state.solutionView === "player");
  hintBtn.classList.toggle("assist", state.showHint);
  solutionBtn.classList.toggle("assist", state.showSolution);
  setHidden(assistModal, !state.assistPrompted);
}

function hasManifoldHint() {
  return (state.officialSolution?.manifolds || []).length > 0;
}

function hasSolverSolution() {
  return state.generationSource === "solver" && (state.officialSolution?.paths || []).length > 0;
}

function showToast(message, duration = 1800) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, duration);
}

function showLevelNotice() {
  if (!state.notice || !levelNoticeModal) return;
  if (state.noticeShown || seenNoticeLevels.has(state.id)) return;
  state.noticeShown = true;
  seenNoticeLevels.add(state.id);
  levelNoticeTitle.textContent = state.noticeTitle;
  levelNoticeCopy.textContent = state.notice;
  setHidden(levelNoticeModal, false);
}

function hideTransientModals() {
  cancelSuccessStateSequence();
  setHidden(assistModal, true);
  setHidden(equipmentModal, true);
  setHidden(levelNoticeModal, true);
  setHidden(clearModal, true);
  setHidden(pandaCelebration, true);
  stopClearModalStateVideo();
  setHidden(lockedModal, true);
  setHidden(deleteManifoldModal, true);
  pendingClearAfterEquipment = false;
  pendingDeleteManifoldId = null;
  clearDeleteReveal();
}

function advanceLevel() {
  const hasFiniteCampaign = campaignLevels.length > 0;
  if (hasFiniteCampaign && levelIndex >= campaignLevels.length - 1) {
    setHidden(lockedModal, false);
    return;
  }
  levelIndex += 1;
  startLevel(levelIndex);
}

function revealOfficialSolution() {
  if (!hasSolverSolution()) {
    showToast("Official solver result is not available for this level");
    return;
  }
  state.assistUnlocked = true;
  state.showHint = true;
  state.showSolution = true;
  state.solutionView = "both";
  showToast(`Official solution ${formatMoney(state.officialCost || 0)}`);
  render();
}

function pickPandaCelebration() {
  if (!ENABLE_WEB_PANDA_GIFS) {
    setHidden(pandaCelebration, true);
    return;
  }
  if (!pandaCelebration || !pandaCelebrationImg || pandaCelebrations.length === 0) return;
  const index = Math.floor(Math.random() * pandaCelebrations.length);
  const panda = pandaCelebrations[index];
  pandaCelebrationImg.src = `${panda.animation}?t=${Date.now()}`;
  pandaCelebrationLabel.textContent = panda.label;
  setHidden(pandaCelebration, false);
}

function showClearModal(cost) {
  if (!clearModal) return;
  const official = state.officialCost ? ` Official solver cost: ${formatMoney(state.officialCost)}.` : "";
  clearModalCopy.textContent = `Your cost: ${formatMoney(cost)}.${official} You can inspect the official solver route before moving on.`;
  clearSolutionBtn.disabled = !hasSolverSolution();
  clearNextBtn.textContent = campaignLevels.length > 0 && state.index >= campaignLevels.length - 1 ? "To be unlocked" : "Next level";
  pickPandaCelebration();
  setHidden(clearModal, false);
  playClearModalStateVideo();
}

function queueClearModalAfterSuccessVideo(cost) {
  pendingSuccessClearCost = cost;
  playSuccessStateVideo();
}

function terrainColor(point) {
  const z = terrainHeight(point);
  const t = Math.max(0, Math.min(1, (z - state.terrain.minZ) / (state.terrain.maxZ - state.terrain.minZ)));
  const east = terrainHeight({ x: Math.min(W, point.x + 18), y: point.y });
  const south = terrainHeight({ x: point.x, y: Math.min(H, point.y + 18) });
  const shade = Math.max(0.58, Math.min(1.18, 0.92 + (z - east) / 170 + (z - south) / 220));
  const deep = state.theme?.deep || [12, 47, 61];
  const mid = state.theme?.mid || [34, 84, 83];
  const high = state.theme?.high || [132, 124, 92];
  const blend = t < 0.55 ? t / 0.55 : (t - 0.55) / 0.45;
  const a = t < 0.55 ? deep : mid;
  const b0 = t < 0.55 ? mid : high;
  const r = Math.round((a[0] + (b0[0] - a[0]) * blend) * shade);
  const g = Math.round((a[1] + (b0[1] - a[1]) * blend) * shade);
  const b = Math.round((a[2] + (b0[2] - a[2]) * blend) * shade);
  return `rgb(${r}, ${g}, ${b})`;
}

function rgba(color, alpha) {
  if (Array.isArray(color)) return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
  return color;
}

function drawBackgroundUncached() {
  const mapImage = webArt?.maps?.[state.index % webArt.maps.length];
  if (mapImage) {
    drawImageCover(mapImage, 0, 0, W, H);
    return;
  }

  const cell = DRAW_TERRAIN_CELL;
  for (let y = 0; y < H; y += cell) {
    for (let x = 0; x < W; x += cell) {
      ctx.fillStyle = terrainColor({ x, y });
      ctx.fillRect(x, y, cell + 1, cell + 1);
    }
  }

  drawSeabedTexture();
  drawContours();

  ctx.strokeStyle = "rgba(231, 224, 176, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 35) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 35) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
}

function drawSeabedTexture() {
  const rand = mulberry32(7000 + state.index * 997);
  const accent = state.theme?.accent || "#7be0bf";
  ctx.save();
  ctx.globalAlpha = 0.23;
  for (let i = 0; i < 90; i += 1) {
    const x = rand() * W;
    const y = rand() * H;
    const len = 22 + rand() * 92;
    ctx.strokeStyle = i % 4 === 0 ? accent : "rgba(215, 251, 246, 0.34)";
    ctx.lineWidth = 0.8 + rand() * 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + len * 0.25, y - 10 + rand() * 20, x + len * 0.75, y - 10 + rand() * 20, x + len, y + rand() * 8);
    ctx.stroke();
  }

  for (let i = 0; i < 180; i += 1) {
    const x = rand() * W;
    const y = rand() * H;
    const r = 1 + rand() * 2.4;
    ctx.fillStyle = "rgba(255, 255, 230, 0.14)";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  const gradient = ctx.createRadialGradient(W * 0.62, H * 0.28, H * 0.08, W * 0.52, H * 0.50, W * 0.88);
  gradient.addColorStop(0, "rgba(255,255,255,0.14)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.02)");
  gradient.addColorStop(1, "rgba(0,22,78,0.28)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);
}

function drawLightTextureLayer(time = performance.now() / 1000) {
  const lights = webArt?.fx?.lights || [];
  if (lights.length > 0) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    lights.forEach((image, index) => {
      if (!image) return;
      ctx.globalAlpha = index === 0 ? 0.18 : 0.11;
      const scale = Math.max(W / image.naturalWidth, H / image.naturalHeight) * 1.22;
      const dw = image.naturalWidth * scale;
      const dh = image.naturalHeight * scale;
      const travel = Math.min(dw - W, dh - H);
      const duration = index === 0 ? 36 : 48;
      const t = ((time + index * duration * 0.47) % duration) / duration;
      const drift = travel * t;
      const baseX = (W - dw) / 2;
      const baseY = (H - dh) / 2;
      drawMovingLightSticker(image, baseX + drift, baseY + drift, dw, dh, travel);
    });
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const topGlow = ctx.createLinearGradient(0, 0, 0, H);
  topGlow.addColorStop(0, "rgba(238, 255, 242, 0.28)");
  topGlow.addColorStop(0.34, "rgba(180, 244, 231, 0.10)");
  topGlow.addColorStop(0.78, "rgba(93, 189, 212, 0.04)");
  topGlow.addColorStop(1, "rgba(24, 84, 155, 0)");
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, W, H);

  const blockW = W / 5;
  for (let i = 0; i < 5; i += 1) {
    const x = i * blockW;
    const alpha = i % 2 === 0 ? 0.09 : 0.045;
    const block = ctx.createLinearGradient(x, 0, x + blockW, H);
    block.addColorStop(0, `rgba(230, 255, 245, ${alpha})`);
    block.addColorStop(0.55, `rgba(170, 238, 232, ${alpha * 0.46})`);
    block.addColorStop(1, "rgba(50, 164, 210, 0)");
    ctx.fillStyle = block;
    ctx.fillRect(x, 0, blockW + 1, H);
  }

  const center = ctx.createRadialGradient(W * 0.55, H * 0.22, H * 0.06, W * 0.55, H * 0.28, W * 0.66);
  center.addColorStop(0, "rgba(255, 255, 236, 0.18)");
  center.addColorStop(0.42, "rgba(203, 251, 244, 0.08)");
  center.addColorStop(1, "rgba(203, 251, 244, 0)");
  ctx.fillStyle = center;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function drawMovingLightSticker(image, x, y, width, height, travel) {
  ctx.drawImage(image, x, y, width, height);
  ctx.drawImage(image, x - travel, y - travel, width, height);
}

function rebuildBackgroundCache() {
  const cache = document.createElement("canvas");
  cache.width = W;
  cache.height = H;
  const mainCtx = ctx;
  ctx = cache.getContext("2d");
  drawBackgroundUncached();
  ctx = mainCtx;
  state.backgroundCache = cache;
}

function drawBackground() {
  if (state.backgroundCache) {
    ctx.drawImage(state.backgroundCache, 0, 0);
    return;
  }
  drawBackgroundUncached();
}

function drawContours() {
  const levels = [-1300, -1150, -1000, -850, -700];
  ctx.lineWidth = 1.2;
  levels.forEach((level) => {
    ctx.strokeStyle = level > -900 ? "rgba(255, 235, 166, 0.20)" : "rgba(210, 238, 232, 0.16)";
    for (let y = 0; y < H - 20; y += 20) {
      ctx.beginPath();
      let started = false;
      for (let x = 0; x < W; x += 20) {
        const z = terrainHeight({ x, y });
        const near = Math.abs(z - level) < 16;
        if (near && !started) {
          ctx.moveTo(x, y);
          started = true;
        } else if (near) {
          ctx.lineTo(x, y);
        } else if (started) {
          ctx.stroke();
          ctx.beginPath();
          started = false;
        }
      }
      if (started) ctx.stroke();
    }
  });
}

function drawObstacles() {
  const clusters = obstacleClusters();
  clusters.forEach((cluster, index) => {
    const art = terrainArt(index);
    if (art) {
      drawObstacleArt(art, cluster.x, cluster.y, cluster.r * 2.32, cluster.r * 1.64, ((index % 5) - 2) * 0.06, 0.88);
      return;
    }
    const kind = clusterKind(index);
    if (kind === "wreck") drawShipwreck(cluster, index);
    else if (kind === "jelly") drawJellyGroup(cluster, index);
    else if (kind === "fish") drawFishSchool(cluster, index);
    else drawCoralReef(cluster, index);
  });
  state.obstacles.forEach((obstacle, index) => {
    const art = terrainArt(index + clusters.length);
    if (art) drawObstacleArt(art, obstacle.x, obstacle.y, obstacle.r * 2.12, obstacle.r * 1.55, ((index % 7) - 3) * 0.05, 0.86);
    else drawCoralReef({ x: obstacle.x, y: obstacle.y, r: obstacle.r }, index + 20);
  });
}

function drawObstacleArt(image, x, y, width, height, rotation = 0, alpha = 0.88) {
  drawImageContain(image, x, y, width, height, rotation, alpha);
}

function drawDecorations() {
  const decorations = state.decorations || [];
  const art = webArt?.decorations || [];
  if (decorations.length === 0 || art.length === 0) return;

  decorations.forEach((item) => {
    const image = art[item.artIndex % art.length];
    if (!image) return;
    drawImageContain(image, item.x, item.y, item.w, item.h, item.rotation, item.alpha);
  });
}

function obstacleClusters() {
  if (!state.blockedCells.length) return [];
  const sample = state.blockedCells.filter((_, index) => index % 12 === 0);
  const clusters = [];
  sample.forEach((cell) => {
    const point = { x: cell.x + cell.w / 2, y: cell.y + cell.h / 2 };
    let cluster = clusters.find((item) => distance(item, point) < 115);
    if (!cluster) {
      cluster = { x: point.x, y: point.y, count: 0, r: 38 };
      clusters.push(cluster);
    }
    cluster.x = (cluster.x * cluster.count + point.x) / (cluster.count + 1);
    cluster.y = (cluster.y * cluster.count + point.y) / (cluster.count + 1);
    cluster.count += 1;
    cluster.r = Math.min(120, 32 + cluster.count * 4.5);
  });
  return clusters.slice(0, 10);
}

function clusterKind(index) {
  const cycle = [state.theme?.wildlife || "reef", "reef", "fish", "jelly", "wreck"];
  return cycle[(index + state.index) % cycle.length];
}

function drawCoralReef(cluster, seedOffset = 0) {
  const rand = mulberry32(30000 + state.index * 101 + seedOffset * 277);
  ctx.save();
  ctx.shadowColor = "rgba(0, 32, 74, 0.26)";
  ctx.shadowBlur = 14;
  const base = ctx.createRadialGradient(cluster.x, cluster.y, 8, cluster.x, cluster.y, cluster.r);
  base.addColorStop(0, "rgba(58, 135, 119, 0.52)");
  base.addColorStop(1, "rgba(17, 85, 106, 0)");
  ctx.fillStyle = base;
  ctx.beginPath();
  ctx.ellipse(cluster.x, cluster.y, cluster.r * 1.25, cluster.r * 0.72, -0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  const colors = ["#ffb6a3", "#f6e58f", "#b9f7d3", "#b99cff", "#ff8fc4", "#80d7ff"];
  for (let i = 0; i < 24; i += 1) {
    const angle = rand() * Math.PI * 2;
    const radius = rand() * cluster.r * 0.82;
    const x = cluster.x + Math.cos(angle) * radius * 1.15;
    const y = cluster.y + Math.sin(angle) * radius * 0.62;
    const h = 10 + rand() * 24;
    ctx.strokeStyle = colors[i % colors.length];
    ctx.lineWidth = 2 + rand() * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - 8, y - h * 0.35, x + 9, y - h * 0.72, x + (rand() - 0.5) * 14, y - h);
    ctx.stroke();
    ctx.fillStyle = colors[(i + 2) % colors.length];
    ctx.beginPath();
    ctx.arc(x + (rand() - 0.5) * 8, y - h * 0.6, 3 + rand() * 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFishSchool(cluster, seedOffset = 0) {
  const rand = mulberry32(41000 + state.index * 191 + seedOffset * 307);
  const time = performance.now() / 1400;
  ctx.save();
  ctx.globalAlpha = 0.78;
  for (let i = 0; i < 44; i += 1) {
    const orbit = (i / 44) * Math.PI * 2 + time * 0.28;
    const wobble = Math.sin(time + i) * 9;
    const x = cluster.x + Math.cos(orbit) * (cluster.r * 0.78 + wobble) + (rand() - 0.5) * 18;
    const y = cluster.y + Math.sin(orbit) * (cluster.r * 0.36 + wobble * 0.25) + (rand() - 0.5) * 14;
    const size = 4 + rand() * 4;
    ctx.fillStyle = i % 5 === 0 ? "#ffe16c" : "#1e6fad";
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.42, orbit, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - Math.cos(orbit) * size, y - Math.sin(orbit) * size);
    ctx.lineTo(x - Math.cos(orbit + 0.7) * size * 1.8, y - Math.sin(orbit + 0.7) * size * 1.1);
    ctx.lineTo(x - Math.cos(orbit - 0.7) * size * 1.8, y - Math.sin(orbit - 0.7) * size * 1.1);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawJellyGroup(cluster, seedOffset = 0) {
  const rand = mulberry32(52000 + state.index * 173 + seedOffset * 233);
  const time = performance.now() / 1800;
  ctx.save();
  for (let i = 0; i < 10; i += 1) {
    const x = cluster.x + (rand() - 0.5) * cluster.r * 1.4 + Math.sin(time + i) * 6;
    const y = cluster.y + (rand() - 0.5) * cluster.r * 0.7 + Math.cos(time * 1.2 + i) * 5;
    const r = 10 + rand() * 10;
    ctx.fillStyle = "rgba(237, 187, 255, 0.35)";
    ctx.strokeStyle = "rgba(252, 232, 255, 0.65)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI, 0);
    ctx.quadraticCurveTo(x, y + r * 0.8, x - r, y);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(242, 213, 255, 0.44)";
    for (let t = -2; t <= 2; t += 1) {
      ctx.beginPath();
      ctx.moveTo(x + t * r * 0.25, y + r * 0.25);
      ctx.bezierCurveTo(x + t * 5, y + r * 1.2, x + t * 7 + Math.sin(time + t) * 6, y + r * 1.8, x + t * 6, y + r * 2.4);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawShipwreck(cluster, seedOffset = 0) {
  const angle = ((seedOffset % 5) - 2) * 0.09;
  ctx.save();
  ctx.translate(cluster.x, cluster.y);
  ctx.rotate(angle);
  ctx.shadowColor = "rgba(0, 26, 60, 0.38)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "rgba(73, 79, 80, 0.82)";
  ctx.strokeStyle = "rgba(23, 45, 58, 0.86)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-cluster.r * 0.85, 8);
  ctx.lineTo(cluster.r * 0.62, -4);
  ctx.lineTo(cluster.r * 0.82, 16);
  ctx.quadraticCurveTo(0, 34, -cluster.r * 0.92, 20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(45, 55, 56, 0.92)";
  ctx.fillRect(-cluster.r * 0.25, -24, cluster.r * 0.42, 24);
  ctx.strokeStyle = "rgba(28, 42, 48, 0.8)";
  ctx.beginPath();
  ctx.moveTo(-8, -26);
  ctx.lineTo(-16, -70);
  ctx.moveTo(14, -25);
  ctx.lineTo(34, -58);
  ctx.moveTo(-30, -8);
  ctx.lineTo(48, -30);
  ctx.stroke();
  ctx.fillStyle = "rgba(125, 95, 67, 0.6)";
  for (let i = 0; i < 5; i += 1) ctx.fillRect(-cluster.r * 0.58 + i * 22, 6, 12, 5);
  ctx.restore();
}

function drawPlatform() {
  const platform = platformPoint();
  const plemImage = webArt?.equipment?.plem;
  if (plemImage) {
    drawImageContain(plemImage, platform.x, platform.y, 72, 72);
    ctx.save();
    ctx.fillStyle = "#172132";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PLEM", platform.x, platform.y + 4);
    ctx.restore();
    return;
  }

  const t = performance.now() / 1000;
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
  ctx.shadowBlur = 14;
  ctx.fillStyle = "#dba932";
  ctx.strokeStyle = "#ffe58a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(platform.x - 42, platform.y - 28, 84, 56, 8);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#b77b25";
  ctx.fillRect(platform.x - 52, platform.y + 21, 104, 9);
  ctx.fillStyle = "#f1c853";
  ctx.beginPath();
  ctx.arc(platform.x, platform.y - 36, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#9b6d22";
  ctx.fillRect(platform.x - 10, platform.y - 61, 20, 22);

  ctx.strokeStyle = "rgba(88, 64, 20, 0.7)";
  ctx.lineWidth = 2;
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(platform.x + i * 24, platform.y + 28);
    ctx.lineTo(platform.x + i * 34, platform.y + 47);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255, 239, 166, 0.9)";
  ctx.beginPath();
  ctx.moveTo(platform.x - 26, platform.y - 28);
  ctx.lineTo(platform.x, platform.y - 62);
  ctx.lineTo(platform.x + 26, platform.y - 28);
  ctx.moveTo(platform.x - 15, platform.y - 43);
  ctx.lineTo(platform.x + 15, platform.y - 43);
  ctx.stroke();

  const glow = 0.72 + Math.sin(t * 4) * 0.18;
  ctx.shadowColor = `rgba(255, 230, 93, ${glow})`;
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#fff0a0";
  ctx.beginPath();
  ctx.arc(platform.x, platform.y - 65, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#1b170f";
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("PLEM", platform.x, platform.y + 8);
  ctx.restore();
}

function drawManifolds() {
  const loads = manifoldLoads();
  state.manifolds.forEach((node) => {
    const load = loads.get(node.id) || 0;
    const full = load >= state.costModel.manifoldMaxLoad;
    const manifoldImage = webArt?.equipment?.manifold;
    if (manifoldImage) {
      drawImageContain(manifoldImage, node.x, node.y, 48, 42, 0, full ? 0.72 : 1);
      ctx.save();
      ctx.fillStyle = full ? "#fff0b8" : "#e8fff8";
      ctx.strokeStyle = "rgba(14, 34, 39, 0.62)";
      ctx.lineWidth = 3;
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.strokeText(`M${node.id + 1}`, node.x, node.y + 3);
      ctx.fillText(`M${node.id + 1}`, node.x, node.y + 3);
      ctx.restore();

      if (!state.settled && revealedDeleteManifoldId === node.id) {
        const remove = manifoldDeletePoint(node);
        ctx.fillStyle = "#6d2c24";
        ctx.strokeStyle = "#ffe1c5";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(remove.x, remove.y, MANIFOLD_DELETE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fff0d8";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("x", remove.x, remove.y + 4);
      }
      return;
    }

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.34)";
    ctx.shadowBlur = 9;
    ctx.fillStyle = full ? "#d8b06b" : "#8edabe";
    ctx.strokeStyle = full ? "#fff0b8" : "#e2fff0";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(node.x - 22, node.y - 17, 44, 34, 7);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "rgba(16, 37, 29, 0.55)";
    ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(node.x - 14, node.y + i * 7);
      ctx.lineTo(node.x + 14, node.y + i * 7);
      ctx.stroke();
    }

    ctx.fillStyle = "#10251d";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`M${node.id + 1}`, node.x, node.y - 2);
    ctx.fillText(`${load}/${state.costModel.manifoldMaxLoad}`, node.x, node.y + 11);
    ctx.restore();

    if (!state.settled && revealedDeleteManifoldId === node.id) {
      const remove = manifoldDeletePoint(node);
      ctx.fillStyle = "#6d2c24";
      ctx.strokeStyle = "#ffe1c5";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(remove.x, remove.y, MANIFOLD_DELETE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#fff0d8";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("x", remove.x, remove.y + 4);
    }
  });
}

function drawWells() {
  const reachable = reachableNodesFromPlatform();
  state.wells.forEach((well) => {
    const online = reachable.has(`well:${well.id}`);
    const pulse = online ? 0.5 + 0.5 * Math.sin(performance.now() / 300 + well.id) : 0;
    const wellImage = webArt?.equipment?.wellhead;
    if (wellImage) {
      ctx.save();
      ctx.shadowColor = online ? "rgba(255, 222, 91, 0.50)" : "rgba(0, 0, 0, 0.26)";
      ctx.shadowBlur = online ? 8 + pulse * 7 : 5;
      drawImageContain(wellImage, well.x, well.y, 34, 42);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#20170d";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(well.id + 1), well.x, well.y + 5);
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.shadowColor = online ? "rgba(255, 222, 91, 0.52)" : "rgba(0, 0, 0, 0.30)";
    ctx.shadowBlur = online ? 8 + pulse * 7 : 6;
    ctx.fillStyle = "#d7a329";
    ctx.strokeStyle = "#ffdf75";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(well.x - 12, well.y + 3, 24, 12, 3);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(well.x - 12, well.y + 3);
    ctx.lineTo(well.x, well.y - 24);
    ctx.lineTo(well.x + 12, well.y + 3);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#b98622";
    ctx.beginPath();
    ctx.arc(well.x, well.y - 2, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = online ? "#fff09b" : "#ffe07a";
    ctx.shadowColor = "rgba(255, 224, 90, 0.75)";
    ctx.shadowBlur = online ? 10 : 5;
    ctx.beginPath();
    ctx.arc(well.x, well.y - 27, 3.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#20170d";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(well.id + 1), well.x, well.y + 13);
    ctx.restore();
  });
}

function strokePolyline(points, color, width, dash = null) {
  if (points.length < 2) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i].x, points[i].y);
  ctx.stroke();
  if (dash) ctx.setLineDash([]);
}

function strokeSmoothPolyline(points, color, width, dash = null) {
  if (points.length < 2) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i += 1) {
    const mid = {
      x: (points[i].x + points[i + 1].x) / 2,
      y: (points[i].y + points[i + 1].y) / 2,
    };
    ctx.quadraticCurveTo(points[i].x, points[i].y, mid.x, mid.y);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
  ctx.stroke();
  if (dash) ctx.setLineDash([]);
}

function drawNaturalPipe(points, kind, invalid = false) {
  const palette = {
    flowline: {
      core: "#d4ad54",
      rim: "rgba(83, 60, 24, 0.88)",
      highlight: "rgba(255, 232, 151, 0.46)",
      shadow: "rgba(0, 18, 24, 0.20)",
      width: 3.8,
    },
    trunkline: {
      core: "#78b8c8",
      rim: "rgba(25, 55, 64, 0.88)",
      highlight: "rgba(202, 246, 255, 0.42)",
      shadow: "rgba(0, 18, 24, 0.23)",
      width: 4.8,
    },
    standard: {
      core: "#d9d0a6",
      rim: "rgba(69, 62, 39, 0.74)",
      highlight: "rgba(255, 246, 190, 0.42)",
      shadow: "rgba(0, 18, 24, 0.16)",
      width: 3.8,
    },
  };
  const style = palette[kind] || palette.standard;
  const width = style.width;

  if (invalid) {
    strokeSmoothPolyline(points, "rgba(92, 23, 18, 0.86)", width + 2.4, [12, 10]);
    strokeSmoothPolyline(points, "rgba(255, 86, 67, 0.92)", width, [12, 10]);
    return;
  }

  ctx.save();
  ctx.translate(1.7, 2.1);
  strokeSmoothPolyline(points, style.shadow, width + 5.2);
  ctx.restore();

  strokeSmoothPolyline(points, style.rim, width + 2.2);
  strokeSmoothPolyline(points, style.core, width);
  strokeSmoothPolyline(points, style.highlight, Math.max(0.9, width * 0.22));
  drawPipeEndpointFittings(points, kind, width);
}

function drawPipeEndpointFittings(points, kind, width) {
  if (points.length < 2) return;
  const color = kind === "flowline" ? "#d7ad4c" : "#7fbccc";
  const rim = kind === "flowline" ? "#513b17" : "#193944";
  [points[0], points[points.length - 1]].forEach((point) => {
    ctx.save();
    ctx.fillStyle = rim;
    ctx.beginPath();
    ctx.arc(point.x, point.y, width + 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, width + 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.beginPath();
    ctx.arc(point.x - 1.2, point.y - 1.2, Math.max(1.2, width * 0.35), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawPipes() {
  state.pipes.forEach((pipe) => {
    const kind = pipe.sourceKind === "well" ? "flowline" : "trunkline";
    drawNaturalPipe(pipe.points, kind);
  });

  if (drawing) {
    const invalid = pathTouchesObstacle(drawing.points) || violatesBendingRadius(drawing.points);
    drawNaturalPipe(drawing.points, "standard", invalid);
  }
}

function drawAssists() {
  if (!state.assistUnlocked || !state.officialSolution) return;

  if (state.showSolution) {
    if (!hasSolverSolution()) return;
    state.officialSolution.paths.forEach((path) => {
      strokeSmoothPolyline(path, "rgba(247, 236, 150, 0.30)", 9);
      strokeSmoothPolyline(path, "rgba(255, 251, 202, 0.84)", 2.4, [9, 9]);
    });
  }

  if (state.showHint || state.showSolution) {
    state.officialSolution.manifolds.forEach((node, index) => {
      ctx.fillStyle = "rgba(255, 238, 131, 0.22)";
      ctx.strokeStyle = "#fff19b";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.arc(node.x, node.y, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#fff4bd";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`M${index + 1}`, node.x, node.y + 6);
    });
  }
}

function render() {
  if (!state) return;
  const view = state.showSolution ? state.solutionView : "both";
  drawBackground();
  drawLightTextureLayer(performance.now() / 1000);
  drawDecorations();
  drawObstacles();
  if (view !== "player") drawAssists();
  if (view !== "official") {
    drawPipes();
    drawManifolds();
  }
  drawPlatform();
  drawWells();
  updateHud();
}

function requestRender() {
  if (renderQueued) return;
  renderQueued = true;
  window.requestAnimationFrame(() => {
    renderQueued = false;
    render();
  });
}

function startVisualTicker() {
  window.cancelAnimationFrame(visualTicker);
  const tick = () => {
    if (state && welcomeScreen.hidden) requestRender();
    visualTicker = window.requestAnimationFrame(tick);
  };
  visualTicker = window.requestAnimationFrame(tick);
}

function clearDeleteReveal() {
  window.clearTimeout(deleteRevealTimer);
  deleteRevealTimer = null;
  deleteRevealCandidateId = null;
  if (revealedDeleteManifoldId != null) {
    revealedDeleteManifoldId = null;
    requestRender();
  }
}

function scheduleDeleteReveal(node) {
  if (!node || state.settled || drawing || mode === "place-manifold") {
    clearDeleteReveal();
    return;
  }
  if (revealedDeleteManifoldId === node.id || deleteRevealCandidateId === node.id) return;
  window.clearTimeout(deleteRevealTimer);
  revealedDeleteManifoldId = null;
  deleteRevealCandidateId = node.id;
  deleteRevealTimer = window.setTimeout(() => {
    if (!state || state.settled || drawing || mode === "place-manifold") return;
    if (!state.manifolds.some((item) => item.id === node.id)) return;
    revealedDeleteManifoldId = node.id;
    deleteRevealCandidateId = null;
    requestRender();
  }, MANIFOLD_DELETE_REVEAL_MS);
}

function setMode(nextMode) {
  mode = nextMode;
  clearDeleteReveal();
  updateHud();
}

function startLevel(index) {
  hideTransientModals();
  setHidden(welcomeScreen, true);
  playIdleStateVideo();
  state = makeLevel(index);
  levelIndex = index;
  drawing = null;
  mode = "pipe";
  state.solutionView = "both";
  nextBtn.hidden = true;
  finishBtn.hidden = false;
  rebuildBackgroundCache();
  if (state.notice) showLevelNotice();
  else showToast(state.intro || `Level ${index + 1}`);
  render();
}

function returnToWelcome() {
  hideTransientModals();
  playIdleStateVideo();
  drawing = null;
  mode = "pipe";
  renderWelcome();
}

function renderWelcome() {
  const total = campaignLevels.length || 1;
  const unlocked = Math.min(total - 1, savedUnlockedLevel());
  levelSelect.innerHTML = "";
  for (let index = 0; index < total; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `L${index + 1}`;
    button.disabled = index > unlocked;
    button.addEventListener("click", () => startLevel(index));
    levelSelect.appendChild(button);
  }
  setHidden(welcomeScreen, false);
}

async function loadCampaignLevels() {
  try {
    const response = await fetch("./data/levels.json", { cache: "no-store" });
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload.levels) ? payload.levels : [];
  } catch {
    return [];
  }
}

function drawImageCover(image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (image.naturalWidth - sw) / 2;
  const sy = (image.naturalHeight - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}

function drawImageContain(image, x, y, width, height, rotation = 0, alpha = 1) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const dw = image.naturalWidth * scale;
  const dh = image.naturalHeight * scale;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.drawImage(image, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();
}

function terrainArt(index) {
  const style = webArt?.terrain?.[0] || [];
  if (style.length === 0) return null;

  const cycle = Math.floor(index / style.length);
  const order = terrainArtOrder(style.length, cycle);
  return style[order[index % style.length]] || null;
}

function terrainArtOrder(count, cycle) {
  if (!state.terrainArtOrders) state.terrainArtOrders = new Map();

  const key = `${count}:${cycle}`;
  if (!state.terrainArtOrders.has(key)) {
    const order = Array.from({ length: count }, (_, index) => index);
    const rand = mulberry32(9100 + state.index * 997 + cycle * 389);
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    state.terrainArtOrders.set(key, order);
  }

  return state.terrainArtOrders.get(key);
}

async function loadPandaCelebrations() {
  try {
    const response = await fetch("./src/assets/panda/manifest.json", { cache: "no-store" });
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
  } catch {
    return [];
  }
}

function placeManifold(point) {
  if (state.manifolds.length >= state.maxManifolds) {
    showToast("Manifold limit reached");
    return;
  }
  if (!isClearPoint(point, state.obstacles, 42)) {
    showToast("Cannot place manifold inside restricted terrain");
    return;
  }
  if (distance(point, platformPoint()) < 58 || state.wells.some((well) => distance(well, point) < 44)) {
    showToast("Too close to PLEM or well");
    return;
  }
  if (state.manifolds.some((node) => distance(node, point) < 58)) {
    showToast("Too close to another manifold");
    return;
  }

  const nextId = state.manifolds.reduce((maxId, node) => Math.max(maxId, node.id), -1) + 1;
  state.manifolds.push({ id: nextId, x: point.x, y: point.y, r: MANIFOLD_RADIUS });
  state.history.push({ type: "manifold" });
  setMode("pipe");
  render();
}

function refreshWellConnections() {
  state.wells.forEach((well) => {
    well.connected = state.pipes.some((pipe) => pipe.sourceKind === "well" && pipe.sourceId === well.id);
  });
}

function promptDeleteManifold(node) {
  window.clearTimeout(deleteRevealTimer);
  deleteRevealTimer = null;
  deleteRevealCandidateId = null;
  pendingDeleteManifoldId = node.id;
  const pipeCount = state.pipes.filter(
    (pipe) =>
      (pipe.sourceKind === "manifold" && pipe.sourceId === node.id) ||
      (pipe.targetKind === "manifold" && pipe.targetId === node.id),
  ).length;
  deleteManifoldCopy.textContent =
    pipeCount > 0
      ? `M${node.id + 1} has ${pipeCount} connected pipe${pipeCount > 1 ? "s" : ""}. Delete it and remove those pipes?`
      : `Delete M${node.id + 1}?`;
  setHidden(deleteManifoldModal, false);
}

function deletePendingManifold() {
  if (pendingDeleteManifoldId == null) return;
  const id = pendingDeleteManifoldId;
  const beforePipes = state.pipes.length;
  state.manifolds = state.manifolds.filter((node) => node.id !== id);
  state.pipes = state.pipes.filter(
    (pipe) =>
      !(pipe.sourceKind === "manifold" && pipe.sourceId === id) &&
      !(pipe.targetKind === "manifold" && pipe.targetId === id),
  );
  refreshWellConnections();
  state.history = [];
  state.settled = false;
  nextBtn.hidden = true;
  finishBtn.hidden = false;
  setHidden(deleteManifoldModal, true);
  pendingDeleteManifoldId = null;
  revealedDeleteManifoldId = null;
  showToast(`Manifold deleted. ${beforePipes - state.pipes.length} pipe(s) removed.`);
  render();
}

canvas.addEventListener("pointerdown", (event) => {
  if (state.settled) return;
  const point = toCanvasPoint(event);

  const deleteHit = findManifoldDeleteHit(point);
  if (deleteHit) {
    promptDeleteManifold(deleteHit);
    return;
  }

  if (mode === "place-manifold") {
    clearDeleteReveal();
    placeManifold(point);
    return;
  }

  const start = findStartNode(point);
  if (!start) return;
  clearDeleteReveal();
  drawing = {
    sourceKind: start.kind,
    sourceId: start.id,
    from: start.point,
    points: [{ x: start.point.x, y: start.point.y }, point],
  };
  canvas.setPointerCapture(event.pointerId);
  render();
});

canvas.addEventListener("pointermove", (event) => {
  const point = toCanvasPoint(event);
  if (!drawing) {
    scheduleDeleteReveal(findManifoldHover(point));
    return;
  }
  const last = drawing.points[drawing.points.length - 1];
  if (distance(last, point) >= MIN_POINT_GAP) drawing.points.push(point);
  requestRender();
});

canvas.addEventListener("pointerup", (event) => {
  if (!drawing) return;
  const end = toCanvasPoint(event);
  drawing.points.push(end);
  const snapTarget = findSnapTarget(end);

  if (pathTouchesObstacle(drawing.points)) {
    showToast("Route crosses restricted terrain");
  } else if (violatesBendingRadius(drawing.points)) {
    showToast(`Bend radius is too tight. Minimum is ${state.costModel.minBendingRadiusM}m`);
  } else if (!snapTarget) {
    showToast("End at PLEM or manifold. Pipes cannot connect directly.");
  } else if (snapTarget.kind === drawing.sourceKind && snapTarget.id === drawing.sourceId) {
    showToast("Cannot connect back to the same node");
  } else if (drawing.sourceKind === "manifold" && isManifoldFull(drawing.sourceId)) {
    showToast("This manifold is full");
  } else if (snapTarget.kind === "manifold" && isManifoldFull(snapTarget.id)) {
    showToast("This manifold is full");
  } else {
    const finalPoint = snapTarget.point;
    const rawPoints = [...drawing.points.slice(0, -1), { x: finalPoint.x, y: finalPoint.y }];
    const points = smoothPath(rawPoints, STORE_SMOOTHING_PASSES);
    if (drawing.sourceKind === "well") state.wells[drawing.sourceId].connected = true;
    state.pipes.push({
      points,
      sourceKind: drawing.sourceKind,
      sourceId: drawing.sourceId,
      targetKind: snapTarget.kind,
      targetId: snapTarget.id,
    });
    state.history.push({ type: "pipe" });
  }

  drawing = null;
  render();
});

canvas.addEventListener("pointerleave", () => {
  clearDeleteReveal();
});

placeManifoldBtn.addEventListener("click", () => {
  setMode(mode === "place-manifold" ? "pipe" : "place-manifold");
  showToast(mode === "place-manifold" ? "Tap the seabed to place a manifold" : "Pipe drawing mode");
});

hintBtn.addEventListener("click", () => {
  state.showHint = !state.showHint;
  if (state.showHint) showToast("Recommended manifold positions are highlighted");
  render();
});

acceptHintBtn.addEventListener("click", () => {
  state.assistPrompted = false;
  state.assistUnlocked = true;
  state.showHint = true;
  showToast("Recommended manifold positions are highlighted");
  render();
});

declineHintBtn.addEventListener("click", () => {
  state.assistPrompted = false;
  state.showHint = false;
  showToast("No hint shown");
  render();
});

solutionBtn.addEventListener("click", () => {
  if (!hasSolverSolution()) {
    showToast("Official solver result is not available for this training level");
    return;
  }
  state.showSolution = !state.showSolution;
  if (state.showSolution) {
    state.showHint = true;
    state.solutionView = "both";
    showToast(`Official solution ${formatMoney(state.officialCost || 0)}`);
  } else {
    state.solutionView = "both";
  }
  render();
});

function setSolutionView(view) {
  state.solutionView = view;
  state.showSolution = true;
  state.showHint = view !== "player";
  render();
}

viewBothBtn?.addEventListener("click", () => setSolutionView("both"));
viewOfficialBtn?.addEventListener("click", () => setSolutionView("official"));
viewPlayerBtn?.addEventListener("click", () => setSolutionView("player"));

undoBtn.addEventListener("click", () => {
  clearDeleteReveal();
  const last = state.history.pop();
  if (!last) return;
  if (last.type === "pipe") state.pipes.pop();
  if (last.type === "manifold") {
    const removed = state.manifolds.pop();
    state.pipes = state.pipes.filter(
      (pipe) =>
        !(pipe.sourceKind === "manifold" && pipe.sourceId === removed.id) &&
        !(pipe.targetKind === "manifold" && pipe.targetId === removed.id),
    );
  }
  refreshWellConnections();
  state.settled = false;
  nextBtn.hidden = true;
  finishBtn.hidden = false;
  render();
});

resetBtn.addEventListener("click", () => startLevel(levelIndex));

finishBtn.addEventListener("click", () => {
  const loads = manifoldLoads();
  const overloaded = [...loads.values()].some((load) => load > state.costModel.manifoldMaxLoad);
  if (overloaded) {
    showToast("A manifold is overloaded");
    return;
  }
  if (connectedWellCount() !== state.wells.length) {
    showToast("Some wells are not connected to the PLEM");
    return;
  }

  state.settled = true;
  const cost = totalCost();
  const passed = cost <= state.target;
  if (!passed) {
    state.failCount += 1;
    levelFailCounts.set(state.index, state.failCount);
    if (state.failCount >= 5 && hasManifoldHint() && !state.assistUnlocked) {
      state.assistPrompted = true;
      render();
      return;
    }
  }
  showToast(passed ? `Success: ${formatMoney(cost)}` : `Over budget: ${formatMoney(cost)}`, 2600);
  nextBtn.hidden = !passed;
  finishBtn.hidden = passed;
  if (passed) {
    saveUnlockedLevel(state.index + 1);
    queueClearModalAfterSuccessVideo(cost);
  }
  render();
});

nextBtn.addEventListener("click", () => {
  advanceLevel();
});

equipmentOkBtn?.addEventListener("click", () => {
  setHidden(equipmentModal, true);
  if (pendingClearAfterEquipment) {
    pendingClearAfterEquipment = false;
    showClearModal(totalCost());
  }
});

levelNoticeOkBtn?.addEventListener("click", () => {
  setHidden(levelNoticeModal, true);
});

clearSolutionBtn?.addEventListener("click", () => {
  setHidden(clearModal, true);
  stopClearModalStateVideo();
  revealOfficialSolution();
});

clearNextBtn?.addEventListener("click", () => {
  setHidden(clearModal, true);
  stopClearModalStateVideo();
  advanceLevel();
});

lockedOkBtn?.addEventListener("click", () => {
  setHidden(lockedModal, true);
});

cancelDeleteManifoldBtn?.addEventListener("click", () => {
  pendingDeleteManifoldId = null;
  clearDeleteReveal();
  setHidden(deleteManifoldModal, true);
});

confirmDeleteManifoldBtn?.addEventListener("click", () => {
  deletePendingManifold();
});

startFirstBtn?.addEventListener("click", () => startLevel(0));
backHomeBtn?.addEventListener("click", () => returnToWelcome());

async function initGame() {
  [campaignLevels, pandaCelebrations] = await Promise.all([loadCampaignLevels(), loadPandaCelebrations(), loadWebArt()]).then(
    ([levels, celebrations]) => [levels, celebrations],
  );
  renderWelcome();
  initStateVideoPlayers();
  startVisualTicker();
}

initGame();
