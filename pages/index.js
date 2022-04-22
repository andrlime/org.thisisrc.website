import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import { FooterComp } from '../src/components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({menu: false, videoModal: false, logoSize: 5, opacity: 0.2});
    this.menuHandler = this.menuHandler.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
    this.setLogoSize = this.setLogoSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setLogoSize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setLogoSize);
  }

  setLogoSize(e) {
    let y = (window.scrollY-400);
    if(y <= 500 && y >= 0) this.setState({logoSize: 5-(y/200)});

    let op = (window.scrollY-500)/100 + 0.2; //opacity
    if(op > 0.2) this.setState({opacity: op});
    else this.setState({opacity: 0.2});
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
    let navjsx = (<div className={styles.nav} style={{backgroundColor: `rgba(165, 83, 176, ${this.state.opacity})`}}>
    <a href="/"><img id={styles.logo} src="/logo_isrc.png" style={{width: `${this.state.logoSize}rem`}}/></a>
    <p style={{fontSize: `${this.state.logoSize*0.7}rem`}}>THIS ISRC</p>
    </div>)

    let nav = [
      {name: "School Registration", link: "/register/school", active: 0},
      {name: "Project Submissions", link: "/register/student", active: 0},
      {name: "About Us", link: "/about", active: 0},
      {name: "Contact Us", link: "/contact", active: 0},
      {name: "Dates & Deadlines", link: "/timeline", active: 0},
      {name: "Conference Schedule", link: "/program", active: 0}
    ];

    let dates = [
      {date: new Date('2022-04-15T23:59:59'), desc: "Early Bird Registration Deadline"},
      {date: new Date('2022-05-06T23:59:59'), desc: "Registration Deadline"},
      {date: new Date('2022-04-28T00:00:00'), desc: "Submission Deadline"},
      {date: new Date('2022-05-28T00:00:00'), desc: "Research Conference"}
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //todo: make the timeline more interactive
    let words = ["Leadership", "Collaboration", "Innovation", "Wellbeing", "Integrity", "Respect"];

    return (
      <div className={styles.earth}>

        <div className={styles.modalButton} onClick={this.modalHandler} style={{display: this.state.videoModal ? "none" : "block"}}>
          <div className={styles.wrapper}>

            <div>
              <svg version="1.1" x="0px" y="0px"
                viewBox="0 0 64 64" >
                <path d="M15.2,15c3,0,5.5,2.5,5.5,5.5s-2.5,5.5-5.5,5.5s-5.5-2.5-5.5-5.5S12.2,15,15.2,15 M15.2,9C8.9,9,3.8,14.1,3.8,20.5
                  s5.1,11.5,11.5,11.5s11.5-5.1,11.5-11.5S21.6,9,15.2,9L15.2,9z"/>
                <path d="M36.5,15c3,0,5.5,2.5,5.5,5.5s-2.5,5.5-5.5,5.5s-5.5-2.5-5.5-5.5S33.5,15,36.5,15 M36.5,9c-6.3,0-11.5,5.1-11.5,11.5
                  s5.1,11.5,11.5,11.5S48,26.8,48,20.5S42.9,9,36.5,9L36.5,9z"/>
                <rect x="6.8" y="34" width="38.3" height="17.8" style={{strokeWidth: "6", strokeMiterlimit: "10"}}/>
                <polygon style={{strokeWidth: "6", strokeMiterlimit: "10"}} points="41.3,42.6 59.2,53 59.2,32.3 "/>
              </svg>
            </div>

            <div id={styles.text}>Watch Our Independent Study Video!</div>

          </div>

        </div> 

        <div className={styles.modalBlack} onClick={this.modalHandler} style={{display: this.state.videoModal ? "block" : "none"}}></div> 
        
        <div className={styles.modal} style={{display: this.state.videoModal ? "block" : "none"}}>

          <img className={styles.button} src="/cross.svg" width="3%" onClick={this.modalHandler}/>

          <video id="video" width="100%" height="100%" style={{backgroundColor: "black"}} controls>
            <source src="https://cdn.thisisrc.org/video-comp.mp4"/>
            Your browser does not support the video tag.
          </video>

        </div> 
      
        <div className={styles.sidebar}>

          <div onClick={this.menuHandler} className={this.state.menu ? styles.menuactive : styles.menu}>

            <span></span>
            <span></span>
            <span></span>

          </div>

          <div className={styles.navlist} style={{display: this.state.menu ? "inline-block" : "none"}}>
            {nav.map((item, i) => (
              <div key={i} className={item.active==0 ? styles.underline : styles.overline}>
                
                <a href={item.link}>{item.name}</a>
                
                
              </div>
            ))}
          </div>

        </div>
        
        <div className={styles.main}>
          
          {navjsx}

          <div style={{backgroundImage: "url(https://cdn.thisisrc.org/cover-image.png)", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat", backgroundSize: "cover", top: "0", zIndex: "-100000"}} className={styles.chead}> 

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

              {[["https://cdn.thisisrc.org/pres1.jpeg", "55", "33"],
              ["https://cdn.thisisrc.org/pres2.jpeg", "55", "33"],
              ["https://cdn.thisisrc.org/pres3.jpeg", "55", "33"],
              ["https://cdn.thisisrc.org/lab.jpeg", "55", "33"],
              ["https://cdn.thisisrc.org/dhodh-models.jpeg", "55", "22"]].map((i, index) => (
                <div key={i} className={styles.img__colorpreload} style={{backgroundImage: `url(${i[0]})`, width: `${i[1]}rem`, height: `${i[2]}rem`, marginBottom: "2rem", backgroundPosition: "center"}}/>
              ))
              }

            </div>

            <div className={styles.timeline}>
              <div id={styles.box}>

                <p id={styles.tltext}>Timeline</p>

                {dates.map((item, i)=> (
                  <p key={i}><span>{months[item.date.getMonth()]} {item.date.getDate()}</span>{item.desc}{item.longdesc}</p>
                ))}<br/>


              </div>
            </div>

            <div className={styles.timeline}>
              <div id={styles.box}>

                <p id={styles.tltext}>Registration Instructions</p>
                <ol>
                  <li>Register at <a href="/register/student">here</a>.</li>
                  <li>Remember to pay! Cost per entry is ¥100.</li>
                  <li>Wait for our confirmation email. We will email you once we confirm your payment. If you do not receive an email, feel free to reach out!</li>
                </ol><br/>

              </div>
            </div>

          </div>

          <div className={styles.footer}>

            <FooterComp/>

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
        <link rel="icon" href="/logo_isrc.png" />
      </Head>
      <App/>
    </>
  );
}
