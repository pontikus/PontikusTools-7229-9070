import { beginCanvas, drawFrame, wrapText, NAVY, CREAM, GOLD } from "./canvas-utils";
export type Visit = { place: string; date: string; note: string };
export type PassportData = { name: string; style: string; removeFrame: boolean; visits: Visit[] };
export async function renderPassport(data: PassportData) {
  const canvas = document.createElement("canvas");
  const w = 1748,
    h = 2480;
  const dark = data.style === "navy";
  const bg = dark ? NAVY : data.style === "minimal" ? "#ffffff" : CREAM;
  const c = await beginCanvas(canvas, w, h, bg);
  const ink = dark ? CREAM : NAVY;
  const accent = dark ? "#d9bf83" : "#79602a";
  c.fillStyle = accent;
  c.font = '27px "IBM Plex Mono"';
  c.fillText("PONTIKUS / COASTAL PASSPORT", 105, 112);
  c.fillStyle = ink;
  c.font = "84px Fraunces";
  wrapText(
    c,
    data.name ? `${data.name}’s coastal pages` : "Places worth remembering.",
    105,
    230,
    w - 210,
    94,
    2,
  );
  c.font = "30px Archivo";
  c.fillText(
    `${data.visits.length} places visited · A personal record, not a travel document`,
    105,
    435,
  );
  const cardW = 724,
    cardH = 290,
    startY = 520;
  data.visits.forEach((visit, i) => {
    const x = 105 + (i % 2) * 814,
      y = startY + Math.floor(i / 2) * 307;
    c.save();
    c.translate(x + cardW / 2, y + cardH / 2);
    c.rotate(((i % 3) - 1) * 0.012);
    c.translate(-cardW / 2, -cardH / 2);
    c.strokeStyle = dark ? GOLD : "#aab1ae";
    c.lineWidth = 2;
    c.setLineDash(data.style === "minimal" ? [] : [8, 6]);
    c.strokeRect(0, 0, cardW, cardH);
    c.setLineDash([]);
    c.strokeRect(12, 12, cardW - 24, cardH - 24);
    c.fillStyle = accent;
    c.font = '22px "IBM Plex Mono"';
    c.fillText(`PORT OF CALL ${String(i + 1).padStart(2, "0")}`, 32, 53);
    c.fillStyle = ink;
    c.font = "43px Fraunces";
    wrapText(c, visit.place || "Your next place", 32, 112, cardW - 64, 51, 2);
    c.font = '23px "IBM Plex Mono"';
    c.fillStyle = accent;
    c.fillText(visit.date || "DATE TO REMEMBER", 32, 211);
    c.font = "25px Archivo";
    c.fillStyle = ink;
    wrapText(c, visit.note || "A small memory from the shore.", 32, 254, cardW - 64, 30, 1);
    c.restore();
  });
  await drawFrame(c, w, h, data.removeFrame);
  return [canvas];
}
