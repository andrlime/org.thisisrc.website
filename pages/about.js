import Head from 'next/head'
import styles from '../styles/Q.module.css'
import React from 'react'
import { FooterComp } from '../src/components'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { menu: false, logoSize: 4, opacity: 0.5 }
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
    const y = window.scrollY - 100
    if (y <= 300 && y >= 0) this.setState({ logoSize: 4 - y / 200 })

    const op = (window.scrollY - 100) / 100 + 0.5 // opacity
    if (op > 0.5) this.setState({ opacity: op })
    else this.setState({ opacity: 0.5 })
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
      { name: 'About Us', link: '/about', active: 1 },
      { name: 'Contact Us', link: '/contact', active: 0 },
      { name: 'Dates & Deadlines', link: '/timeline', active: 0 },
      { name: 'Conference Schedule', link: '/program', active: 0 }
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
            <div style={{ width: '60%' }}>
              <div
                style={{
                  backgroundImage:
                    'url(https://cdn.thisisrc.org/this-bldg.jpeg)',
                  width: '50rem',
                  height: '30rem'
                }}
                id={styles.about__schoolimg}
                className={styles.img__colorpreload}
              />

              <p className={styles.about__head}>What is the ISRC?</p>
              <p className={styles.about__text}>
                The <b>International Schools Research Colloquium (ISRC)</b> is a
                unique forum for high school students to showcase their academic
                prowess. Tsinghua International School invites seniors currently
                engaged in academic research at their schools, to this
                first-of-its-kind conference to share and celebrate your
                research journeys. The colloquium will include panel
                discussions, displays, student and teacher-led workshops and
                more.
              </p>

              <div
                style={{
                  backgroundImage:
                    'url(https://cdn.thisisrc.org/core-values.jpeg)',
                  width: '30rem',
                  height: '30rem'
                }}
                id={styles.about__schoolimg}
                className={styles.img__colorpreload}
              />

              <p className={styles.about__head}>
                About Tsinghua International School
              </p>
              <p className={styles.about__text}>
                <b>Tsinghua International School (THIS)</b>, founded in 2009, is
                affiliated to Tsinghua University. We are an integration of
                Chinese and Western education and culture combined with the
                Tsinghua spirit. Our mission is to foster creative critical
                thinkers who are rooted in China and prepared to lead in the
                global community.
              </p>

              <p className={styles.about__head}>
                Research at THIS – The Independent Study Program
              </p>
              <p className={styles.about__text}>
                In the last year of high school, students can choose to
                undertake the bespoke <b>Independent Study pathway</b> in
                addition to their required coursework. Independent Study is
                research project designed by individual students under the
                supervision of a teacher. It demonstrates our highest benchmark
                of inquiry, innovation and leadership. Students have ventured
                into research in various fields and disciplines ranging from
                Art, Archeology, Political Science, International Relations, to
                Math, Biochemistry, Musical Composition, Filmmaking and more.
              </p>
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
