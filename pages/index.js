import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';
import {isMobile} from 'react-device-detect';
import ReactTypingEffect from 'react-typing-effect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({menu: false, phone: isMobile, videoModal: false});
    this.menuHandler = this.menuHandler.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
  }

  modalHandler(e) {
    let s = !this.state.videoModal;

    if(s) {
      document.body.classList.add("stopscroll")
    } else {
      document.getElementById('video').pause();
      document.getElementById('video').currentTime = 0;
      document.body.classList.remove("stopscroll")
    }

    this.setState({videoModal: s});
  }

  menuHandler(e) {
    let cState = !this.state.menu;
    this.setState({menu: cState});
  }

  render() {
    let nav = [
      {name: "School Registration", link: "/register", active: 0},
      {name: "Project Submissions", link: "/submit", active: 0},
      {name: "About Us", link: "/about", active: 0},
      {name: "Contact Us", link: "/contact", active: 0},
      {name: "Dates & Deadlines", link: "/timeline", active: 0}
    ];

    let dates = [
      {date: new Date('2022-04-01T00:00:00'), desc: "Abstracts Due", longdesc: ""},
      {date: new Date('2022-05-01T00:00:00'), desc: "Research Conference", longdesc: ""}
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //todo: make the timeline more interactive

    let menuWidth = this.state.phone && this.state.menu ? "100vw" : (this.state.menu ? "25vw" : "");
    let words = ["Leadership", "Collaboration", "Innovation", "Wellbeing", "Integrity", "Respect"];

    return (
      <div className={styles.earth}>

        <div className={styles.modalButton} onClick={this.modalHandler} style={{display: this.state.videoModal ? "none" : "block"}}>

          Watch Our Independent Study Video!

        </div> 

        <div className={styles.modalBlack} onClick={this.modalHandler} style={{display: this.state.videoModal ? "block" : "none"}}></div> 
        
        <div className={styles.modal} style={{display: this.state.videoModal ? "block" : "none"}}>

          <img className={styles.button} src="/cross.svg" width="3%" onClick={this.modalHandler}/>

          <video id="video" width="100%" height="100%" style={{backgroundColor: "black"}} controls>
            <source src="http://d2yg8h2dgs5f44.cloudfront.net/video-comp.mp4"/>
            Your browser does not support the video tag.
          </video>

        </div> 
      
        <div className={styles.sidebar}>

          <div style={{width: menuWidth}} onClick={this.menuHandler} className={this.state.menu ? styles.menuactive : styles.menu}>

            <span></span>
            <span></span>
            <span></span>

          </div>

          <div className={styles.navlist} style={{display: this.state.menu ? "inline-block" : "none"}}>
            {nav.map((item, i) => (
              <div className={item.active==0 ? styles.underline : styles.overline}>
                
                <a href={item.link}>{item.name}</a>
                
                
              </div>
            ))}
          </div>

        </div>
        
        <div className={styles.main}>
          <div className={styles.nav}>
            <a href="/"><img id={styles.logo} src="/this-logo.png"/></a>
          </div>

          <div style={{backgroundImage: "url(/photos/cover-image.png)", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat", backgroundSize: "cover", top: "0", zIndex: "-100000"}} className={styles.chead}> 
          <ReactTypingEffect text={words} cursorRenderer={cursor => <h1>{cursor}</h1>} eraseDelay="3000" speed="40" eraseSpeed="40" typingDelay="1000" cursor=" "
          displayTextRenderer={(text, i) => {
            return (
              <p>
                {text.split('').map((char, j) => {
                  const key = `${j}`;
                  return (
                    <span
                      key={key}
                    >{char}</span>
                  );
                })}
              </p>
            );
          }}/></div>

          <div className={styles.mainContent}>

            <div className={styles.photos}>
              <img className={styles.photo} src="/photos/pres1.jpeg"/>
              <img className={styles.photo} src="/photos/pres2.jpeg"/>
              <img className={styles.photo} src="/photos/pres3.jpeg"/>
              <img className={styles.photo} src="/photos/lab.jpeg"/>
              <img className={styles.photo} src="/photos/dhodh-models.jpeg" style={{border: "1px solid black"}}/>
            </div>

            <div className={styles.timeline}>
              <div id={styles.box}>

                <p id={styles.tltext}>Timeline</p>

                {dates.map((item, i)=> (
                  <p><span>{months[item.date.getMonth()]} {item.date.getDate()}</span>{item.desc}{item.longdesc}</p>
                ))}


              </div>
            </div>

          </div>

          <div className={styles.footer}>

            <div className={styles.imgbox}><img src="logo-spartan.svg"/><img src="this-logo.png"/>
            </div>

            <div className={styles.text}>
            <span>Powered by React</span>
            <span>Designed by <span>Andrew Li</span></span>
            </div>
          </div>
        </div>       
      
      </div>
    );
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>THIS ISRC 2022</title>
        <link rel="icon" href="/logo-spartan.svg" />
      </Head>
      <App/>
    </>
  );
}
