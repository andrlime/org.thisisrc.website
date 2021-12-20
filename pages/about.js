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
      {name: "About Us", link: "/about", active: 1},
      {name: "Contact Us", link: "/contact", active: 0},
      {name: "Dates & Deadlines", link: "/timeline", active: 0}
    ];
    let menuWidth = this.state.phone && this.state.menu ? "100vw" : (this.state.menu ? "25vw" : "");

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
            <div className={item.active==0 ? styles.underline : styles.overline}><a href={item.link}>{item.name}</a></div>
          ))}

        </div>

      </div>
      
      <div className={styles.main}>
        <div className={styles.nav}>
          <a href="/"><img id={styles.logo} src="/this-logo.png"/></a>
        </div>

        <div className={styles.mainContent}>
          
          <div style={{width: "60%"}}>
            <img src="/photos/this-bldg.jpeg" className={styles.about__img}/>

            <p className={styles.about__head}>What is the ISRC?</p>
            <p className={styles.about__text}>The <b>International Schools Research Colloquium (ISRC)</b> is a unique forum for high school students to showcase their academic prowess. Tsinghua International School invites seniors currently engaged in academic research at their schools, to this first-of-its-kind conference to share and celebrate your research journeys. The colloquium will include panel discussions, displays, student and teacher-led workshops and more.</p>

            <img src="/photos/core-values.jpeg" className={styles.about__img} style={{width: "40%"}}/>

            <p className={styles.about__head}>About Tsinghua International School</p>
            <p className={styles.about__text}><b>Tsinghua International School (THIS)</b>, founded in 2009, is affiliated to Tsinghua University. We are an integration of Chinese and Western education and culture combined with the Tsinghua spirit. Our mission is to foster creative critical thinkers who are rooted in China and prepared to lead in the global community.</p>

            <p className={styles.about__head}>Research at THIS – The Independent Study Program</p>
            <p className={styles.about__text}>In the last year of high school, students can choose to undertake the bespoke <b>Independent Study pathway</b> in addition to their required coursework. Independent Study is research project designed by individual students under the supervision of a teacher. It demonstrates our highest benchmark of inquiry, innovation and leadership. Students have ventured into research in various fields and disciplines ranging from Art, Archeology, Political Science, International Relations, to Math, Biochemistry, Musical Composition, Filmmaking and more.</p>
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
        <title>THIS ISRC 2022 - About Us</title>
        <link rel="icon" href="/logo-spartan.svg" />
      </Head>
      <App/>
    </>
  );
}
