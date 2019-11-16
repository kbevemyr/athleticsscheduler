import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Text } from 'grommet';


/*
  Basic algoritm
    Convert the DOM into svg
    Convert the svg into png
    Convert the png into pdf
*/
export function exportPdf (id) {
  const input = document.getElementById(id);

  html2canvas(input)
    .then((canvas) => {

      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210;
      var pageHeight = 295;
      var landscape = false;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var r = 0.25;
      // do we have to switch to landscape mode?
      console.log({canvas, imgWidth, pageHeight, landscape, imgHeight, heightLeft});
      if (Math.floor(canvas.width*r) >= imgWidth) {
        console.log("switch to landscape mode");
      }

      var pdf = new jsPDF((landscape ? 'l' : 'p'), 'mm');
      var position = 10; // give some top padding to first page

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${id}.pdf`);
    });
}

//const PrintButton = ({id, label}) => (<div className="tc mb4 mt2">
export const PrintExport = ({id, label}) => (<div>
  {/*
    Getting pixel height in milimeters:
    https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
  */}
  <div id="myMm" style={{height: "1mm"}} />

  <div onClick={() => {exportPdf(id)}}>
    <Text>{label}</Text>
  </div>
</div>);

export default PrintExport;
