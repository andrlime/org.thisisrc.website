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
  {name: "School Registration", link: "/register/school", active: 1},
  {name: "Project Submissions", link: "/register/student", active: 0},
  {name: "About Us", link: "/about", active: 0},
  {name: "Contact Us", link: "/contact", active: 0},
  {name: "Dates & Deadlines", link: "/timeline", active: 0},
  {name: "Conference Schedule", link: "/program", active: 0}
];


const SchoolRegistration = () => {

  const Navigation = (
    <div className={styles.nav} style={{backgroundColor: `rgba(165, 83, 176, 1)`}}>
    <a href="/"><img id={styles.logo} src="/this-logo.png" style={{width: `3rem`}}/></a>
    <p style={{fontSize: `2.2rem`}}>THIS ISRC</p>
    </div>
  )

  const colors = ["#82318E", "#FF2211", "#119911"];

  const [menu, setMenu] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [pronouns, setPronouns] = useState("");

  const isValidEmail = useRef(false);

  const EARLY_BIRD_TIME = new Date('2022-04-15T23:59:59');
  
  return (
    <div className={styles.earth}>
      <Head>
        <title>THIS ISRC 2022 - Registration</title>
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
            <p id={styles.formhead}>School Registration</p>
            <p style={{color: "#FF2211"}}>{message}</p>

            <p id={styles.formsubhead}>School Information</p>
            <span>School Name: <input style={{border: `2px solid ${colors[0]}`}} value={schoolName} onChange={(event) => (setSchoolName(event.target.value))}></input></span>

            <p id={styles.formsubhead}>Contact Information</p>
            <span>Contact Name: <input style={{border: `2px solid ${colors[0]}`}} value={contactName} onChange={(event) => (setContactName(event.target.value))}></input></span><br/>
            <span>Contact Email: <input style={{border: `2px solid ${colors[contactEmail ? isValidEmail.current + 1 : 0]}`}} value={contactEmail} onChange={(event) => {
              setContactEmail(event.target.value);
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

            <span>Position: <input style={{border: `2px solid ${colors[0]}`}} value={contactPosition} onChange={(event) => (setContactPosition(event.target.value))}></input></span><br/>

            <p style={{width: "50%"}}>You will receive a unique school code upon verification of information submitted and confirmation of payment receipt. Students will use this code to submit projects.</p>

            <p>Payment Instruction: wire transfer {((new Date()) < EARLY_BIRD_TIME) ? "¥450" : "¥650"}* to the following account:</p>
            <span><b>单位名称</b>: 北京市海淀区清华创新教育培训中心</span><br/>
            <span><b>帐号</b>: 01090352400120111115560</span><br/>
            <span>北京银行清华大学支行</span> 
            <p>Please include a payment memo: “School Name – ISRC payment"</p>
            <span>*450 is the early bird price, which applies to registration before April 15th. 650 is the normal registration price, which applies to all other registrations.</span><br/><br/>

            <button onClick={() => {
            //submit the form
            //test if all requirements are met
            if(schoolName && contactName && contactEmail && contactPosition && isValidEmail.current && pronouns) {
              let school = {
                name: schoolName,
                contact_name: contactName,
                contact_position: contactPosition,
                contact_email: contactEmail,
                pronouns: pronouns
              };
            
              axios
                .post("https://ribbon.thisisrc.org/schools/add", school)
                .then(result => {
                  setShowModal(true);
                }).catch(err => {
                  setShowModal(false);
                  setMessage("There was an error. Please try again. If this persists, please send us an email with your registration info.");
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

export default SchoolRegistration
