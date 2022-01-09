import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({menu: false, 
      formColors: {name: 0, contact: 0, position: 0, email: 0, verify: 0},
      formData: {name: "", contact: "", position: "", email: "", verify: ""},
      message: "",
      showConfirmationModal: false,
      submitModal: false,
      schoolCode: "",
      apiON: false,
      logoSize: 3, opacity: 1
    });
    this.menuHandler = this.menuHandler.bind(this);
    this.nameHandler = this.nameHandler.bind(this);
    this.contactHandler = this.contactHandler.bind(this);
    this.positionHandler = this.positionHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.verifyHandler = this.verifyHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.post = this.post.bind(this);
    this.modalHandler = this.modalHandler.bind(this);//confirm screen
    this.setLogoSize = this.setLogoSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setLogoSize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setLogoSize);
  }

  setLogoSize(e) {
    let y = (window.scrollY-50)/2;
    if(y <= 300 && y >= 0) this.setState({logoSize: 3-(y/200)});
  }

  submitHandler(e) {
    if(this.state.formColors.name == 1 && this.state.formColors.contact == 1 && this.state.formColors.position == 1 && this.state.formColors.email == 1 && this.state.formColors.verify == 1) {
      //all green
      //show confirmation screen. write code.
      this.setState({showConfirmationModal: true});
      document.body.classList.add("stopscroll")
    } else {
      let str = "The form has errors. Please correct them and submit again.";
      this.setState({message: str});
    }
  }

  modalHandler(e) {
    if(this.state.submitModal) {
      let s = !this.state.submitModal;

      if(s) {
        document.body.classList.add("stopscroll")
      } else {
        document.body.classList.remove("stopscroll")
      }
  
      this.setState({submitModal: s});
    } else {
      let s = !this.state.showConfirmationModal;

      if(s) {
        document.body.classList.add("stopscroll")
      } else {
        document.body.classList.remove("stopscroll")
      }
  
      this.setState({showConfirmationModal: s});
    }
  }

  post(e) {
    e.preventDefault();

    axios
      .get("https://api.thisisrc.org/api", {})
      .then(R => {
        this.setState({apiON: true});

        let school = {
          schoolname: this.state.formData.name,
          contactname: this.state.formData.contact,
          contactposition: this.state.formData.position,
          contactemail: this.state.formData.email
        };
      
        axios
          .post("https://api.thisisrc.org/schools/add", school)
          .then(result => {
            this.setState({submitModal: true, showConfirmationModal: false, schoolCode: result.data.code});
          });
    }).catch(err => {
      this.setState({submitModal: false, showConfirmationModal: false, message: "There was an error. Please try again. If this continues, please send us an email with your registration info."});
      document.body.classList.remove("stopscroll");
      window.scrollTo(0, 0);
    });
  }

  //1: green, 2: red

  menuHandler(e) {
    let cState = !this.state.menu;
    this.setState({menu: cState});
  }

  nameHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.name = 2;
    } else {
      colors.name = 1;
    }
    data.name = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  contactHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.contact = 2;
    } else {
      colors.contact = 1;
    }
    data.contact = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  positionHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.position = 2;
    } else {
      colors.position = 1;
    }
    data.position = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  emailHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    data.email = e.target.value;

    let rx = /((\w|[-]|[.])+[@]\w+([.]\w+)+)/g; //tests if it's an email
    if(e.target.value.match(rx) == e.target.value) {
      colors.email = 1;
    } else {
      colors.email = 2;
    }

    this.setState({formColors: colors, formData: data});

    this.email(e);
  }

  verifyHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    data.verify = e.target.value;

    let rx = /((\w|[-]|[.])+[@]\w+([.]\w+)+)/g; //tests if it's an email
    if(e.target.value == this.state.formData.email && e.target.value != "" && this.state.formData.email.match(rx) == e.target.value) {
      colors.verify = 1;
    } else {
      colors.verify = 2;
    }

    this.setState({formColors: colors, formData: data});

    this.email(e);
  }

  email(e) {
    let colors = this.state.formColors;
    if(this.state.formData.email != this.state.formData.verify) {
      colors.verify = 2;
    }
    this.setState({formColors: colors});
  }

  render() {
    let navjsx = (<div className={styles.nav} style={{backgroundColor: `rgba(165, 83, 176, ${this.state.opacity})`}}>
    <a href="/"><img id={styles.logo} src="/this-logo.png" style={{width: `${this.state.logoSize}rem`}}/></a>
    <p style={{fontSize: `${this.state.logoSize*0.7}rem`}}>THIS ISRC</p>
    </div>)

    let nav = [
      {name: "School Registration", link: "/register", active: 1},
      {name: "Project Submissions", link: "/submit", active: 0},
      {name: "About Us", link: "/about", active: 0},
      {name: "Contact Us", link: "/contact", active: 0},
      {name: "Dates & Deadlines", link: "/timeline", active: 0}
    ];

    let colors = ["#82318E", "#119911", "#FF2211"];

    return (
      <div className={styles.earth}>

      <div className={styles.modalBlack} onClick={this.modalHandler} style={{display: (this.state.showConfirmationModal || this.state.submitModal) ? "block" : "none"}}></div>
      <div className={styles.confirmModal} style={{display: this.state.showConfirmationModal ? "block" : "none"}}>
        <div className={styles.wrapper}>
          <>
          <p>Please confirm your submission.</p>
          <p>You will NOT be able to change this information once you submit! Don't close this page until you see a green check mark. It will take a few seconds. Please wait.</p>
          </>

          <div className={styles.wrapper__text}>
          <p>School Name: <span>{this.state.formData.name}</span></p>
          <p>Contact Name: <span>{this.state.formData.contact}</span></p>
          <p>Contact Position: <span>{this.state.formData.position}</span></p>
          <p>Contact Email: <span>{this.state.formData.email}</span></p>
          </div>
          
          <div id={styles.confirm__button}>
          <button onClick={this.post}>Submit</button>
          </div>
        </div>
      </div>

      <div className={styles.submitModal} style={{display: this.state.submitModal ? "block" : "none"}}>
        <div className={styles.wrapper}>
          <>
          <img src="/check.svg"/>
          <p>Success!</p>
          <p>Your school code is</p>
          <p style={{fontSize: "5rem", fontWeight: "900", color: "black", padding: "0.5rem", margin: "2rem"}}>{this.state.schoolCode}</p>
          <p style={{fontWeight: "400"}}>Students must use this code to register. Take a screenshot of this page. Remember that the code is case-sensitive. We will reach out to you via email within 48 hours. If we do not reach out, please send us an email at <a href="mailto:isrc@this.edu.cn">isrc@this.edu.cn</a>.</p>
          </>
        </div>
      </div> 


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

          <div className={styles.form}>
            <p id={styles.formhead}>School Registration</p>
            <p style={{color: "#FF2211"}}>{this.state.message}</p>
            <span>Name of School: <span id={styles.star}>*</span> <br/><input onChange={this.nameHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.name]}`}} required value={this.state.formData.name}></input><br/></span>
            <span>Contact Person Name: <span id={styles.star}>*</span> <br/><input onChange={this.contactHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.contact]}`}} required value={this.state.formData.contact}></input><br/></span>
            <span>Contact Person Position: <span id={styles.star}>*</span> <br/><input onChange={this.positionHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.position]}`}} required value={this.state.formData.position}></input><br/></span>
            <span>Contact Email: <span id={styles.star}>*</span> <br/><input onChange={this.emailHandler} type="email" style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.email]}`}} required value={this.state.formData.email}></input><br/></span>
            <span>Verify Email: <span id={styles.star}>*</span> <br/><input onChange={this.verifyHandler} type="email" style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.verify]}`}} required value={this.state.formData.verify}></input><br/></span>

            <p style={{width: "50%"}}>You will receive a unique school code upon verification of information submitted and confirmation of payment receipt. Students will use this code to submit projects.</p>
            
            <p>Payment Instruction: wire transfer [amount] to the following account:</p>
            <span>[account number]</span> 
            <p>Please include a payment memo: “School Name – ISRC payment"</p>

            <button onClick={this.submitHandler}>Register</button>
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
        <title>THIS ISRC 2022 - Registration</title>
        <link rel="icon" href="/logo-spartan.svg" />
      </Head>
      <App/>
    </>
  );
}
