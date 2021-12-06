import Head from 'next/head';
import styles from '../styles/R.module.css';
import React from 'react';

class App extends React.Component {
  render() {
    let nav = [
      {name: "About us", link: "/register"},
      {name: "Register", link: "/register"},
      {name: "Another link", link: "/register"}
    ];

    let dates = [
      {date: new Date('2021-12-01T00:00:00'), desc: "Date 1"},
      {date: new Date('2022-01-01T00:00:00'), desc: "Date 2"},
      {date: new Date('2022-02-01T00:00:00'), desc: "Date 3"}
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //todo: make the timeline more interactive

    return (
      <>
      <div className={styles.logo}>Logo will go here</div>
      <div className={styles.menucont}>
        <div className={styles.left}>

          {nav.map((i,index) => (
            <div className={styles.navitem}>{i.name}
              <div className={styles.underline}></div>
            </div>
          ))}

        </div>
       
        <div className={styles.right}>

            <p className={styles.datehead}>Dates and Deadlines</p>
            {dates.map((i, index) => (
              <p className={styles.datestr}><span>{months[i.date.getMonth()]} {i.date.getDate()}, {i.date.getFullYear()}</span> - {i.desc}</p>
            ))}

        </div>
      </div>

      <div className={styles.maincont}>

          <div className={styles.video}>
            Video will go here
          </div>

          <div className={styles.photos}>
            <div className={styles.photo}>Photo 1. This will be a slideshow</div>
          </div>

      </div>

      <div className={styles.footer}>
        <div className={styles.imagebox}>
          <img src="/this-logo.png"/>
        </div>
        
        <div className={styles.footerbox}>

            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
            <p>ICP Number</p>
            <p>Designed by <span>Andrew Li THIS '22</span></p>

        </div>

      </div>
      </>
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
