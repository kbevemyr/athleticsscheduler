import React from 'react';

// first className: "bg-white shadow-1 center pa4"

const Page = ({children, singleMode, id}) => (<div
  id={id} className="bg-white shadow-1"
  style={{width: "210mm", height: singleMode ? "297mm" : ""}}
>
  {children}
</div>);

export default Page;
