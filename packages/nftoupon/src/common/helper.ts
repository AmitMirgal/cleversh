import isEmpty from "lodash/isEmpty";

export const fetcher = async (key: string, url: string, payload?: any) => {
  let options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "NFToupon-Key": key,
    },
  };

  options = isEmpty(payload)
    ? options
    : { ...options, body: JSON.stringify(payload) };

  const response = await fetch(url, options);

  const result = await response.json();
  return result;
};

export const drawCanvas = () => {
  const canvas: any = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = screen.width;
  canvas.height = 450;

  const wrapText = function (
    ctx: any,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";
    let testLine = "";
    let wordArray = [];
    let totalLineHeight = 0;
    for (let n = 0; n < words.length; n++) {
      testLine += `${words[n]} `;
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        wordArray.push([line, x, y]);
        y += lineHeight;
        totalLineHeight += lineHeight;
        line = `${words[n]} `;
        testLine = `${words[n]} `;
      } else {
        line += `${words[n]} `;
      }
      if (n === words.length - 1) {
        wordArray.push([line, x, y]);
      }
    }
    return [wordArray, totalLineHeight];
  };

  // Add gradient
  let grd = ctx.createLinearGradient(0, 450, screen.width, 0);
  grd.addColorStop(0, "#00a0ff");
  grd.addColorStop(1, "#12cba6");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, screen.width, 450);

  // Write text
  ctx.font = "bold 2.5rem Inter, Avenir, Helvetica, Arial, sans-serif";
  ctx.fillStyle = "white";
  let wrappedText: any = wrapText(ctx, "Download this one", 85, 85, 1200, 100);
  wrappedText[0].forEach(function (item: any) {
    ctx.fillText(item[0], item[1], item[2]);
  });

  let canvasUrl = canvas.toDataURL();
  //console.log(canvasUrl);
};
