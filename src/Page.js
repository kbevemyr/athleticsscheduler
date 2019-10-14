import React from 'react';

// I index.html länkas css-paketet http://tachyons.io/
// first className: "bg-white shadow-1 center pa4"
// shadow-1 get en ide om ytan som ska skrivas ut, tas bort när man går live
//bg-white är background-color: white

const Page = ({children, singleMode, id}) => (<div
  id={id} className="bg-white shadow-1"
  style={{width: "210mm", height: singleMode ? "297mm" : ""}}
>
  {children}
</div>);

export default Page;
