import React from 'react'
import './CourseInfo.css'
import CContent  from './CourseContentData';


function CourseContent() {

  return (
    <>
      <h1>Course content</h1>
      <div className="item2-course-container">
        {CContent[0].content.map((item, key) => (
          <details key={key}>
            <summary>{item.heading}</summary>
            <article>
              {item.subHeadings.map((subHeading, subKey) => (
                <ul key={subKey} className='course-content-list'>
                <li>{subHeading}</li>
                </ul>
              ))}
            </article>
          </details>
        ))}
      </div>
    </>
  )
}

export default CourseContent;
