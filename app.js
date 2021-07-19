const Screenshot = require("screenshot-desktop");
const cv = require("opencv4nodejs-prebuilt");
const robot = require("robotjs");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  while (true) {
    await delay(10)

    let pointImage = cv.imread("point.png", cv.IMREAD_UNCHANGED);

    let screenshot = await Screenshot()
      .then((img) => {
        return img;
      })
      .catch((err) => {
        console.log(error);
        return null;
      });

    let image = cv.imdecode(screenshot);

    // console.log(image)
    image = image.getRegion(new cv.Rect(640, 335, 640, 425));
    image = image.cvtColor(cv.IMREAD_COLOR);
    //cv.imwrite("test.jpg", image);

    let resultMatch = pointImage.matchTemplate(image, cv.TM_CCOEFF_NORMED);

    let minMaxLoc = cv.minMaxLoc(resultMatch)

    console.log(minMaxLoc.maxVal);

    if(minMaxLoc.maxVal >= .7)
    {
      robot.moveMouse(640 + minMaxLoc.maxLoc.x + 32, 335 + minMaxLoc.maxLoc.y + 32);
      robot.mouseClick("left")
    }
  }
}

main()
