 // await page.waitForSelector('.ace_layer.ace_text-layer');

  // // Get the ace_layer ace_text-layer div
  // const aceLayerElement = await page.$('.ace_layer.ace_text-layer');

  // // Get all ace_line elements within the ace_layer ace_text-layer div
  // const aceLineElements = await aceLayerElement.$$('.ace_line');

  // // Loop through ace_line elements and remove text content
  // for (const aceLineElement of aceLineElements) {
  //   await page.evaluate(element => {
  //     element.innerText = '';
  //   }, aceLineElement);
  // }