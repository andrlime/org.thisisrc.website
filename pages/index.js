import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';
import {isMobile} from 'react-device-detect';
import ReactTypingEffect from 'react-typing-effect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({menu: false, phone: isMobile});
    this.menuHandler = this.menuHandler.bind(this);
  }

  menuHandler(e) {
    let cState = !this.state.menu;
    this.setState({menu: cState});
  }

  render() {
    let nav = [
      {name: "About Us", link: "/register"},
      {name: "Register", link: "/register"},
      {name: "Our Core Values", link: "/register"}
    ];

    let dates = [
      {date: new Date('2021-12-01T00:00:00'), desc: "Date 1", longdesc: "long description goes here"},
      {date: new Date('2022-01-01T00:00:00'), desc: "Date 2", longdesc: "long description goes here"},
      {date: new Date('2022-02-01T00:00:00'), desc: "Date 3", longdesc: "long description goes here"}
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //todo: make the timeline more interactive

    let menuWidth = this.state.phone && this.state.menu ? "100vw" : (this.state.menu ? "25vw" : "");
    let words = ["Research", "Innovation", "Discovery"];

    return (
      <div className={styles.earth}>
      <div className={styles.sidebar}>

        <div style={{width: menuWidth}} onClick={this.menuHandler} className={this.state.menu ? styles.menuactive : styles.menu}>

          <span></span>
          <span></span>
          <span></span>

        </div>

        <div className={styles.navlist} style={{display: this.state.menu ? "inline-block" : "none"}}>

          {nav.map((item, i) => (
            <div className={styles.underline}><a href={item.link}>{item.name}</a></div>
          ))}

        </div>

      </div>
      
      <div className={styles.main}>
        <div className={styles.nav}>
          <img id={styles.logo} src="/this-logo.png"/>
        </div>

        <div style={{backgroundImage: "url(/background-test.jpeg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}} className={styles.chead}> 
        <ReactTypingEffect text={words} cursorRenderer={cursor => <h1>{cursor}</h1>} eraseDelay="3000" speed="60" eraseSpeed="60" typingDelay="1000" cursor=" "
        displayTextRenderer={(text, i) => {
          return (
            <p>
              {text.split('').map((char, i) => {
                const key = `${i}`;
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
            <img className={styles.photo} src="/background-test.jpeg"/>
            <img className={styles.photo} src="/background-test.jpeg"/>
            <img className={styles.photo} src="/background-test.jpeg"/>
            <img className={styles.photo} src="/background-test.jpeg"/>
          </div>

          <div className={styles.timeline}>
            <div id={styles.box}>

              {dates.map((item, i)=> (
                <p><span>{months[item.date.getMonth()]} {item.date.getDate()}</span>{item.desc}<div className={styles.underline}></div><hr/>{item.longdesc}</p>
              ))}
              <p></p><p></p>

            </div>
            <div id={styles.line}></div>
          </div>

        </div>

        <div className={styles.footer}>

          <div className={styles.imgbox}><img src="logo-spartan.svg"/><img src="this-logo.png"/>
          </div>

          <div className={styles.text}><span>Privacy Policy</span>
          <span>Terms and Conditions</span>
          <span>Powered by React</span>
          <span>Designed by <span>Andrew Li</span></span></div>

          

        </div>
      </div></div>
    );
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Tsinghua International School Research Conference 2022</title>
      </Head>
      <App/>
    </>
  );
}
