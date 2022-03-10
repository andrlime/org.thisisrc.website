import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({menu: false, logoSize: 3, opacity: 1});
    this.menuHandler = this.menuHandler.bind(this);
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
    if(y <= 500 && y >= 0) this.setState({logoSize: 3-(y/200)});
  }

  menuHandler(e) {
    let cState = !this.state.menu;
    this.setState({menu: cState});
  }

  render() {
    let navjsx = (<div className={styles.nav} style={{backgroundColor: `rgba(165, 83, 176, ${this.state.opacity})`}}>
    <a href="/"><img id={styles.logo} src="/this-logo.png" style={{width: `${this.state.logoSize}rem`}}/></a>
    <p style={{fontSize: `${this.state.logoSize*0.7}rem`}}>THIS ISRC</p>
    </div>)

    let nav = [
      {name: "School Registration", link: "/register/school", active: 0},
      {name: "Project Submissions", link: "/register/student", active: 0},
      {name: "About Us", link: "/about", active: 0},
      {name: "Contact Us", link: "/contact", active: 0},
      {name: "Dates & Deadlines", link: "/timeline", active: 1},
      {name: "Conference Schedule", link: "/program", active: 0}
    ];

    let dates = [
      {date: new Date('2022-03-20T00:00:00'), desc: "Early Bird Registration Deadline"},
      {date: new Date('2022-04-08T00:00:00'), desc: "Registration Deadline"},
      {date: new Date('2022-04-28T00:00:00'), desc: "Submission Deadline"},
      {date: new Date('2022-05-28T00:00:00'), desc: "Research Conference"},
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
        {navjsx}

        <div className={styles.mainContent}>
          
          <div className={styles.tlbig} style={{width: "80%"}}>
            <p>Dates and Deadlines</p>

            {dates.map((item, i)=> (
              <p key={i}><span>{months[item.date.getMonth()]} {item.date.getDate()}</span>{item.desc}</p>
            ))}

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
