import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';
import {isMobile} from 'react-device-detect';

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
      {name: "School Registration", link: "/register", active: 0},
      {name: "Project Submissions", link: "/submit", active: 0},
      {name: "About Us", link: "/about", active: 0},
      {name: "Contact Us", link: "/contact", active: 1},
      {name: "Dates & Deadlines", link: "/timeline", active: 0}
    ];

    return (
      <div className={styles.earth}>
      <div className={styles.sidebar}>

        <div onClick={this.menuHandler} className={this.state.menu ? styles.menuactive : styles.menu}>

          <span></span>
          <span></span>
          <span></span>

        </div>

        <div className={styles.navlist} style={{display: this.state.menu ? "inline-block" : "none"}}>

          {nav.map((item, i) => (
            <div key={i} className={item.active==0 ? styles.underline : styles.overline}><a href={item.link}>{item.name}</a></div>
          ))}

        </div>

      </div>
      
      <div className={styles.main}>
        <div className={styles.nav}>
          <a href="/"><img id={styles.logo} src="/this-logo.png"/></a>
        </div>

        <div className={styles.mainContent}>
          
          <div style={{width: "80%"}}>
            <p className={styles.about__head}>Contact Email Addresses</p>
            <p className={styles.about__text}>If you want to contact us, please email one of the below emails based on your query:</p>
            <p className={styles.about__text}><b>Have questions about our research conference?</b> Please email <a href="mailto:isrc@this.edu.cn">isrc@this.edu.cn.</a></p>
            <p className={styles.about__text}><b>Found a bug on the website?</b> Please email <a href="mailto:andrew_li22@this.edu.cn">andrew_li22@this.edu.cn.</a></p>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
      </div></div>
    );
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>THIS ISRC 2022 - Contact</title>
        <link rel="icon" href="/logo-spartan.svg" />
      </Head>
      <App/>
    </>
  );
}
