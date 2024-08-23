import React from 'react'

function WhatWillYouLearn() {

  const WWYLearn=[
    {id:1,content:['The course provides the entire toolbox you need to become a data scientist','Start coding in Python and learn how to use it for statistical analysis','Impress interviewers by showing an understanding of the data science field','Warm up your fingers as you will be eager to apply everything you have learned here to more and more real-life situations']}
  ];

  return (
  <>
    <div className="Item1-container">
      <h1>What will you learn?</h1>
      {WWYLearn.map((val,key)=>(
        <ul key={key}>
        {val.content.map((content,mykey)=>(
          <li key={mykey}>{content}</li>
        ))}
        </ul>
      ))}
    </div>
  </>
  )
}

export default WhatWillYouLearn