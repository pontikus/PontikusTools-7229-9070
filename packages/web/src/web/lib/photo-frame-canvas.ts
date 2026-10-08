import {
  beginCanvas,
  cover,
  loadImage,
  drawFrame,
  effectiveRemoveFrame,
  wrapText,
  NAVY,
  CREAM,
} from "./canvas-utils";
export type PhotoFrameData = {
  photo: string;
  caption: string;
  location: string;
  credit: string;
  style: string;
  format: "square" | "vertical";
  removeFrame: boolean;
};
export async function renderPhotoFrame(data: PhotoFrameData) {
  const w = 1080,
    h = data.format === "square" ? 1080 : 1920;
  const canvas = document.createElement("canvas");
  const dark = data.style === "navy";
  const c = await beginCanvas(
    canvas,
    w,
    h,
    dark ? NAVY : data.style === "minimal" ? "#fff" : CREAM,
  );
  const photo = await loadImage(data.photo);
  const bottom = effectiveRemoveFrame(data.removeFrame) ? h : h - 49;
  const margin = data.style === "minimal" ? 32 : 60;
  const photoHeight = bottom - 320 - margin;
  cover(c, photo, margin, margin, w - 2 * margin, photoHeight);
  const ink = dark ? CREAM : NAVY;
  c.fillStyle = dark ? "#d9bf83" : "#79602a";
  c.font = '23px "IBM Plex Mono"';
  wrapText(
    c,
    data.location.toUpperCase() || "YOUR COAST",
    margin,
    bottom - 246,
    w - margin * 2,
    29,
    1,
  );
  c.fillStyle = ink;
  c.font = "48px Fraunces";
  wrapText(c, data.caption || "A moment by the sea.", margin, bottom - 180, w - margin * 2, 58, 2);
  c.font = "23px Archivo";
  wrapText(
    c,
    data.credit ? `Photograph: ${data.credit}` : "",
    margin,
    bottom - 47,
    w - margin * 2,
    29,
    1,
  );
  await drawFrame(c, w, h, data.removeFrame);
  return [canvas];
}
