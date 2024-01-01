


const puppeteer = require('puppeteer');
const searchButtonNodeSelector = "#potd_solve_prob";

function removeCommentsFromCppCode(cppCode) {
    // Remove single-line comments (// ...)
    let codeWithoutSingleLineComments = cppCode.replace(/\/\/.*?\n/g, '');
  
    // Remove multi-line comments (/* ... */)
    let codeWithoutMultiLineComments = codeWithoutSingleLineComments.replace(/\/\*[\s\S]*?\*\//g, '');
  
    // Replace line breaks with spaces
    let codeSingleLine = codeWithoutMultiLineComments.replace(/\n/g, ' ');
  
    return codeSingleLine;
  }

async function visitWebsiteAndClickButton() {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
   
    await page.setViewport({ width: 1920, height: 1080 });
    

    await page.goto('https://auth.geeksforgeeks.org/');

await page.waitForSelector('input#luser');

await page.type('input#luser', 'Username');

await page.waitForSelector('input#password');

await page.type('input#password', 'Password');

await page.click('button.btn.btn-green.signin-button');

const page2 = await browser.newPage();
await page2.setViewport({ width: 1920, height: 900 });

   
    await page2.goto('https://www.geeksforgeeks.org/problem-of-the-day?itm_source=geeksforgeeks&itm_medium=main_header&itm_campaign=practice_header');
  
 
   await page2.waitForSelector('#potd_solve_prob');

  

   const link = await page2.$eval('#potd_solve_prob', link => link.href);



 
   console.log('Link:', link);

   await page2.goto(link)

   await page2.click(".comment")

       
   await page2.waitForSelector('.language-cpp');

  
  const preContent = await page2.$eval('.language-cpp', element => element.innerText);
  


  const cppCodeWithComments = preContent;
  
  let cppCodeWithoutCommentsSingleLine = removeCommentsFromCppCode(cppCodeWithComments);
  console.log(cppCodeWithoutCommentsSingleLine);

  await page2.waitForSelector('.ace_layer.ace_text-layer');

  // // Get the ace_layer ace_text-layer div
  const aceLayerElement = await page2.$('.ace_layer.ace_text-layer');
  const aceLineElements = await aceLayerElement.$$('.ace_line');

  // for (const aceLineElement of aceLineElements) {
  //   const innerText = await page2.evaluate(element => element.innerText, aceLineElement);
  //   console.log('Ace Line Inner Text:', innerText);
  // }
  let codetoadd;
for(let i=1;i<aceLineElements.length-1 ;i++){

  const aceElement = aceLineElements[i];
 

  if(i==1){
    await page2.waitForTimeout(2000); 
   
    codetoadd = cppCodeWithoutCommentsSingleLine;
    await page2.evaluate((element, code) => element.innerText = code, aceElement, codetoadd);
  }else{
    await page2.waitForTimeout(2000); 
  const innerText = await page2.evaluate(element => element.innerText = ' ',aceElement);
  console.log('Ace Element ',innerText);

  }


}

await page2.waitForTimeout(2000); 
await page2.waitForSelector(".problems_submit_button__6QoNQ");

await page2.click(".ui.button.problems_submit_button__6QoNQ");

  // // Get all ace_line elements within the ace_layer ace_text-layer div
  // const aceLineElements = await aceLayerElement.$$('.ace_line');

  // // Loop through ace_line elements and remove text content
  // for (const aceLineElement of aceLineElements) {
  //   await page2.evaluate(element => {
  //     element.innerText = '';
  //   }, aceLineElement);
  // }

}

visitWebsiteAndClickButton();
