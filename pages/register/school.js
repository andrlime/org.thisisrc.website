import Head from 'next/head'
import styles from '../../styles/Q.module.css'
import { React, useState, useRef } from 'react'
import axios from 'axios'

const Footer = (
  <div className={styles.footer}>
    <div className={styles.imgbox}>
      <img src='../logo-spartan.svg' />
      <img src='../this-logo.png' />
    </div>

    <div className={styles.text}>
      <span>Powered by React</span>
      <span>
        Designed by <span>Andrew Li</span>
      </span>
    </div>
  </div>
)

const nav = [
  { name: 'School Registration', link: '/register/school', active: 1 },
  { name: 'Project Submissions', link: '/register/student', active: 0 },
  { name: 'About Us', link: '/about', active: 0 },
  { name: 'Contact Us', link: '/contact', active: 0 },
  { name: 'Dates & Deadlines', link: '/timeline', active: 0 },
  { name: 'Conference Schedule', link: '/program', active: 0 }
]

const SchoolRegistration = () => {
  const Navigation = (
    <div
      className={styles.nav}
      style={{ backgroundColor: 'rgba(165, 83, 176, 1)' }}
    >
      <a href='/'>
        <img id={styles.logo} src='/this-logo.png' style={{ width: '3rem' }} />
      </a>
      <p style={{ fontSize: '2.2rem' }}>THIS ISRC</p>
    </div>
  )

  const colors = ['#82318E', '#FF2211', '#119911']

  const [menu, setMenu] = useState(false)

  return (
    <div className={styles.earth}>
      <Head>
        <title>THIS ISRC 2022 - Registration</title>
        <link rel='icon' href='/logo-spartan.svg' />
      </Head>

      <div className={styles.sidebar}>
        <div
          onClick={() => setMenu(!menu)}
          className={menu ? styles.menuactive : styles.menu}
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className={styles.navlist}
          style={{ display: menu ? 'inline-block' : 'none' }}
        >
          {nav.map((item, i) => (
            <div
              key={i}
              className={item.active == 0 ? styles.underline : styles.overline}
            >
              <a href={item.link}>{item.name}</a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        {Navigation}
        <div className={styles.mainContent}>
          <div className={styles.form}>
            <p id={styles.formhead}>
              You no longer need to register per school. Have students register
              at <a href='/register/student'>this link</a>!
            </p>
          </div>
        </div>
        {Footer}
      </div>
    </div>
  )
}

export default SchoolRegistration
