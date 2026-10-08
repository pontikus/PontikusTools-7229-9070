import {
  beginCanvas,
  cover,
  loadImage,
  drawFrame,
  wrapText,
  NAVY,
  CREAM,
  GOLD,
} from "./canvas-utils";
export type JournalDay = {
  date: string;
  where: string;
  company: string;
  moment: string;
  weather: string;
  noticed: string;
  photos: string[];
};
export type JournalData = {
  title: string;
  style: string;
  removeFrame: boolean;
  days: JournalDay[];
};
export async function renderJournal(data: JournalData) {
  return Promise.all(
    data.days.map(async (day, index) => {
      const canvas = document.createElement("canvas");
      const w = 1748,
        h = 2480,
        dark = data.style === "navy";
      const c = await beginCanvas(
        canvas,
        w,
        h,
        dark ? NAVY : data.style === "minimal" ? "#fff" : CREAM,
      );
      const ink = dark ? CREAM : NAVY,
        accent = dark ? "#d9bf83" : "#79602a";
      c.fillStyle = accent;
      c.font = '26px "IBM Plex Mono"';
      c.fillText(`PONTIKUS / TRIP JOURNAL / DAY ${String(index + 1).padStart(2, "0")}`, 105, 110);
      c.fillStyle = ink;
      c.font = "76px Fraunces";
      wrapText(c, data.title || "Days by the sea", 105, 230, w - 210, 86, 2);
      c.font = '28px "IBM Plex Mono"';
      c.fillStyle = accent;
      c.fillText(day.date || "A DAY TO REMEMBER", 105, 429);
      const prompts = [
        ["WHERE", day.where],
        ["WHO WITH", day.company],
        ["BEST MOMENT", day.moment],
        ["TIDE AND WEATHER", day.weather],
        ["A SMALL THING YOU NOTICED", day.noticed],
      ];
      prompts.forEach(([label, value], i) => {
        const y = 525 + i * 262;
        c.fillStyle = accent;
        c.font = '24px "IBM Plex Mono"';
        c.fillText(label, 105, y);
        c.fillStyle = ink;
        c.font = "37px Archivo";
        wrapText(c, value || "Your memory goes here.", 105, y + 68, w - 210, 51, 3);
        c.strokeStyle = dark ? "#a18b57" : "#d2cabb";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(105, y + 226);
        c.lineTo(w - 105, y + 226);
        c.stroke();
      });
      if (day.photos.length) {
        const gap = 24,
          pw = (w - 210 - gap * (day.photos.length - 1)) / day.photos.length;
        const images = await Promise.all(day.photos.map(loadImage));
        images.forEach((img, i) => {
          cover(c, img, 105 + i * (pw + gap), 1880, pw, 380);
          c.strokeStyle = GOLD;
          c.strokeRect(105 + i * (pw + gap), 1880, pw, 380);
        });
      } else {
        c.fillStyle = accent;
        c.font = "29px Fraunces";
        c.fillText("Some days are best remembered in words.", 105, 2000);
      }
      await drawFrame(c, w, h, data.removeFrame);
      return canvas;
    }),
  );
}
