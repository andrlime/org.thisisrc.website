import Head from 'next/head'
import styles from '../styles/Q.module.css'
import React from 'react'
import { FooterComp } from '../src/components'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { menu: false, logoSize: 3, opacity: 1 }
    this.menuHandler = this.menuHandler.bind(this)
    this.setLogoSize = this.setLogoSize.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.setLogoSize)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.setLogoSize)
  }

  setLogoSize (e) {
    const y = window.scrollY - 400
    if (y <= 500 && y >= 0) this.setState({ logoSize: 3 - y / 200 })
  }

  menuHandler (e) {
    const cState = !this.state.menu
    this.setState({ menu: cState })
  }

  render () {
    const navjsx = (
      <div
        className={styles.nav}
        style={{ backgroundColor: `rgba(165, 83, 176, ${this.state.opacity})` }}
      >
        <a href='/'>
          <img
            id={styles.logo}
            src='/logo_isrc.png'
            style={{ width: `${this.state.logoSize}rem` }}
          />
        </a>
        <p style={{ fontSize: `${this.state.logoSize * 0.7}rem` }}>THIS ISRC</p>
      </div>
    )

    const nav = [
      { name: 'School Registration', link: '/register/school', active: 0 },
      { name: 'Project Submissions', link: '/register/student', active: 0 },
      { name: 'About Us', link: '/about', active: 0 },
      { name: 'Contact Us', link: '/contact', active: 0 },
      { name: 'Dates & Deadlines', link: '/timeline', active: 0 },
      { name: 'Conference Schedule', link: '/program', active: 1 }
    ]

    const dates = [
      { date: '8:00-8:30', desc: 'Registration' },
      { date: '8:30-8:50', desc: 'Opening Ceremony - Keynote Speech' },
      { date: '9:00-9:55', desc: 'Panel 1, Panel 2, Performance 1' },
      { date: '10:00-10:45', desc: 'Interactive Session 1' },
      { date: '10:50-11:00', desc: 'Break' },
      { date: '11:00-11:55', desc: 'AM Workshop Sessions 1 & 2' },
      { date: '12:00-13:00', desc: 'Lunch' },
      { date: '13:05-13:55', desc: 'PM Workshop Sessions 1 & 2' },
      { date: '13:55-14:05', desc: 'Break' },
      { date: '14:05-14:55', desc: 'Panel 3, Panel 4, Performance 2' },
      { date: '15:00-15:45', desc: 'Interactitive Session 2' },
      { date: '15:50-16:16', desc: 'Closing Ceremony' }
    ]

    return (
      <div className={styles.earth}>
        <div className={styles.sidebar}>
          <div
            onClick={this.menuHandler}
            className={this.state.menu ? styles.menuactive : styles.menu}
          >
            <span />
            <span />
            <span />
          </div>

          <div
            className={styles.navlist}
            style={{ display: this.state.menu ? 'inline-block' : 'none' }}
          >
            {nav.map((item, i) => (
              <div
                key={i}
                className={
                  item.active == 0 ? styles.underline : styles.overline
                }
              >
                <a href={item.link}>{item.name}</a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.main}>
          {navjsx}

          <div className={styles.mainContent}>
            <div className={styles.tlbig} style={{ width: '80%' }}>
              <p>Conference Program</p>

              {dates.map((item, i) => (
                <p key={i}>
                  <span>{item.date}</span>
                  {item.desc}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <FooterComp />

            <div className={styles.text}>
              <span>Powered by React</span>
              <span>
                Designed by <span>Andrew Li</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function Home () {
  return (
    <>
      <Head>
        <title>THIS ISRC 2022 - About Us</title>
        <link rel='icon' href='/logo_isrc.png' />
      </Head>
      <App />
    </>
  )
}
