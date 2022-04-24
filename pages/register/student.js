import Head from 'next/head';
import styles from '../../styles/Q.module.css';
import { React, useState, useRef } from 'react';
import axios from 'axios';

const Footer = (
  <div className={styles.footer}>
    <div className={styles.imgbox}><img src="../logo-spartan.svg"/><img src="../this-logo.png"/>
    </div>

    <div className={styles.text}>
    <span>Powered by React</span>
    <span>Designed by <span>Andrew Li</span></span>
    </div>
  </div>
)

let nav = [
  {name: "School Registration", link: "/register/school", active: 0},
  {name: "Project Submissions", link: "/register/student", active: 1},
  {name: "About Us", link: "/about", active: 0},
  {name: "Contact Us", link: "/contact", active: 0},
  {name: "Dates & Deadlines", link: "/timeline", active: 0},
  {name: "Conference Schedule", link: "/program", active: 0}
];


const StudentRegistration = () => {

  const Navigation = (
    <div className={styles.nav} style={{backgroundColor: `rgba(165, 83, 176, 1)`}}>
    <a href="/"><img id={styles.logo} src="/this-logo.png" style={{width: `3rem`}}/></a>
    <p style={{fontSize: `2.2rem`}}>THIS ISRC</p>
    </div>
  )

  const colors = ["#82318E", "#FF2211", "#119911"];

  let descriptions = [
    (<span>Visual Presentation of students’ project. Examples of display include research posters, prototypes, art work, etc. Display submissions are for students only.</span>),
    (<span>
      <ol>
        <li><b>Panel 1:</b> Ethics in Research</li>
        <li><b>Panel 2:</b> Action Research</li>
        <li><b>Panel 3:</b> Disciplinary Face-off</li>
        <li><b>Panel 4:</b> Open Panel</li>
      </ol>
      Please indicate which panel you are interested in and whether you want to be panel head or a panelist. If you choose the open panel option, please include a title of for the panel and a brief description.
    </span>),
  (<span>An activity where people work together on a specific subject or topic. Examples of workshop ideas are: Coding, Research skills, Genetic Editing Methods. Teachers and students can submit a workshop topic.</span>)
  ];

  return (
    <div className={styles.earth}>
      <Head>
        <title>THIS ISRC 2022 - Project Submission</title>
        <link rel="icon" href="/logo-spartan.svg" />
      </Head>

      <div className={styles.sidebar}>

        <div onClick={() => (setMenu(!menu))} className={menu ? styles.menuactive : styles.menu}>

          <span></span>
          <span></span>
          <span></span>

        </div>

        <div className={styles.navlist} style={{display: menu ? "inline-block" : "none"}}>

          {nav.map((item, i) => (
            <div key={i} className={item.active==0 ? styles.underline : styles.overline}><a href={item.link}>{item.name}</a></div>
          ))}

        </div>
      </div>
      
      <div className={styles.main}>
        {Navigation}
        <div className={styles.mainContent}>
            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shri6cf0evsFNN0ku?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="1631" style={{background: "transparent", border: "1px solid #ccc"}}></iframe>
           <p>This is the payment code. Please pay ¥100 and include your name and school as a payment note.</p>
           <img src="../payment.jpg"/>
        </div>
        {Footer}
        
      </div></div>
  );
}

export default StudentRegistration
