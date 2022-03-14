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

  const [menu, setMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  //student info
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentSchoolCode, setStudentSchoolCode] = useState("");
  const [studentSchool, setStudentSchool] = useState("");

  //project info
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDescriptionLength, setProjectDescriptionLength] = useState(0);
  const [projectDisciplineOne, setProjectDisciplineOne] = useState("");
  const [showDisTwo, setShowDisTwo] = useState(false);
  const [projectDisciplineTwo, setProjectDisciplineTwo] = useState("");
  const [pronouns, setPronouns] = useState("");

  //type
  const [description, setDesc] = useState("");
  const [showDesc, setShowDesc] = useState(false);

  //ref
  const isValidEmail = useRef(false);
  const isValidSchool = useRef(false);

  let descriptions = [
    (<span>Visual Presentation of students’ project. Examples of display include research posters, prototypes, art work, etc. Display submissions are for students only.</span>),
    (<span>Involves a group of people gathered to discuss a topic in front of an audience. Teachers and students can submit a request to a panel head or panelist to one of these 4 panels:
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

      <div className={styles.modalBlack} onClick={() => (setShowModal(false))} style={{display: (showModal) ? "block" : "none"}}></div>
      <div className={styles.submitModal} style={{display: (showModal) ? "block" : "none"}}>
      <div className={styles.wrapper}>
          <>
          <img src="../check.svg"/>
          <p>Success!</p>
          <p>We will reach out to you via email within 48 hours. Please check your inbox! If we do not reach out, please send us an email at <a href="mailto:isrc@this.edu.cn">isrc@this.edu.cn</a>.</p>
          </>
        </div>
      </div>
      
      <div className={styles.main}>
        {Navigation}
        <div className={styles.mainContent}>
          <div className={styles.form}>
            <p id={styles.formhead}>Student Registration</p>
            <p style={{color: "#FF2211"}}>{message}</p>

            <p id={styles.formsubhead}>Student Information</p>
            <span>Student Name: <input style={{border: `2px solid ${colors[0]}`}} value={studentName} onChange={(event) => (setStudentName(event.target.value))}></input></span><br/>
            <span>Student Email: <input style={{border: `2px solid ${colors[studentEmail ? isValidEmail.current+1 : 0]}`}} value={studentEmail} onChange={(event) => {
              setStudentEmail(event.target.value);
              let rx = /((\w|[-]|[.])+[@]\w+([.]\w+)+)/g; //tests if it's an email
              isValidEmail.current = (event.target.value.match(rx) == event.target.value);
            }}></input></span><br/>

            <span>Preferred Pronouns: <select style={{border: `2px solid ${colors[0]}`}} value={pronouns} onChange={(event) => (setPronouns(event.target.value))}>
              <option>Please Select</option>
              <option>he/him/his</option>  
              <option>she/her/hers</option> 
              <option>they/them/theirs</option>
              <option>other</option>
            </select></span><br/>

            <span>School Code (case sensitive!): <input style={{border: `2px solid ${colors[0]}`}} value={studentSchoolCode} onChange={(event) => {
              setStudentSchoolCode(event.target.value);
              if(event.target.value.length == 7) {
                axios
                .get(`https://ribbon.thisisrc.org/schools/${event.target.value}`)
                .then((res) => {
                  if(res.data != null) {
                    setStudentSchool(res.data.name);
                    isValidSchool.current = true;
                  } else {
                    setStudentSchool("Could not find your school.")
                    isValidSchool.current = false;
                  }
                }).catch(err => {
                  setStudentSchool(`${err}`)
                  isValidSchool.current = false;
                });
              }
            }}></input></span>&nbsp;<span>{studentSchool}</span><br/>

            <p id={styles.formsubhead}>Project Information</p>
              <span>Type:&nbsp;<select onChange={(event) => (setProjectType(event.target.value))} style={{border: `2px solid ${colors[0]}`}} value={projectType}>
                
                <option value="n">Please Select</option>
                <option value="d">Display</option>
                <option value="p">Panel</option>
                <option value="w">Workshop</option>
                
              </select><br/>
              <button onMouseEnter={(event) => {
                setDesc(descriptions[event.target.value]);
                setShowDesc(true);
              }} value={0}>Display</button><span>&nbsp;&nbsp;&nbsp;</span>

              <button onMouseEnter={(event) => {
                setDesc(descriptions[event.target.value]);
                setShowDesc(true);
              }} value={1}>Panel</button><span>&nbsp;&nbsp;&nbsp;</span>

              <button onMouseEnter={(event) => {
                setDesc(descriptions[event.target.value]);
                setShowDesc(true);
              }} value={2}>Workshop</button>

              <br/><br/></span>

              <div style={{display: showDesc ? "block" : "none", backgroundColor: "#EDEDED", padding: "0.5rem", borderRadius: "1rem", width: "60%", height: "fit-content", marginBottom: "1rem", transition: "500ms all ease-in-out"}}>{description}</div>


              <span>Title: <input onChange={(event) => (setProjectTitle(event.target.value))} style={{border: `2px solid ${colors[0]}`}} value={projectTitle}></input><br/></span>
              <span>Description: <br/><textarea onChange={(event) => {
                setProjectDescription(event.target.value);
                let rx_words = /(\s)/g;
                let wc = [...event.target.value.matchAll(rx_words)];
                setProjectDescriptionLength(wc.length);
              }} style={{border: `2px solid ${colors[0]}`}} value={projectDescription}></textarea>
              <span id={styles.wcword} style={{color: projectDescriptionLength>250 ? colors[2] : colors[0]}}>{projectDescriptionLength}/250</span>
              
              <br/></span>
              <span>{showDisTwo ? "First " : ""}Discipline: <select onChange={(event) => (setProjectDisciplineOne(event.target.value))} style={{border: `2px solid ${colors[0]}`}} value={projectDisciplineOne}>
                
                <option value="n">Please Select</option>
                <option value="Science">Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Math">Math</option>
                <option value="Language Arts">Language Arts</option>
                <option value="Fine Arts">Fine Arts</option>
                <option value="Digital Arts">Digital Arts</option>
                <option value="Physical Education">Physical Education</option>
                
              </select><button id={styles.addButton} style={{borderRadius: "10rem", padding: "0.5rem", lineHeight: "0.5"}} onClick={() => (setShowDisTwo(!showDisTwo))}>{showDisTwo ? "–" : "+"}</button><br/></span>

              {showDisTwo ? (<span>Second Discipline: <select onChange={(event) => (setProjectDisciplineTwo(event.target.value))} style={{border: `2px solid ${colors[0]}`}}  value={projectDisciplineTwo}>
                
                <option value="n">Please Select</option>
                <option value="Science">Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Math">Math</option>
                <option value="Language Arts">Language Arts</option>
                <option value="Fine Arts">Fine Arts</option>
                <option value="Digital Arts">Digital Arts</option>
                <option value="Physical Education">Physical Education</option>
                
              </select><br/></span>) : ""}

            <button onClick={() => {
            //submit the form
            //test if all requirements are met
            if(pronouns && studentName && studentEmail && studentSchool && isValidSchool.current && projectTitle &&
              projectType && projectDescription && projectDisciplineOne && isValidEmail.current && (projectDescriptionLength < 250) && (showDisTwo==projectDisciplineTwo)
            ) {

              let student = {
                contact_name: studentName,
                contact_email: studentEmail,
                contact_position: "Student",
                project_type: projectType,
                project_title: projectTitle,
                project_description: projectDescription,
                school: studentSchoolCode,
                pronouns: pronouns
              };

              
            
              axios
                .post("https://ribbon.thisisrc.org/students/add", student)
                .then(result => {
                  setShowModal(true);
                }).catch(err => {
                  setShowModal(false);
                  setMessage("There was an error. Please try again. If this continues, please send us an email with your registration info.");
                  document.body.classList.remove("stopscroll");
                  window.scrollTo(0, 0);
                });
            } else {
              setMessage("You didn't complete the form or your email was invalid.");
            }
            }}>Register</button>
          </div>
        </div>
        {Footer}
        
      </div></div>
  );
}

export default StudentRegistration
