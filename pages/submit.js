import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';
import {isMobile} from 'react-device-detect';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({menu: false, phone: isMobile,
      formColors: {type: 0, name: 0, title: 0, abstract: 0, discipline: 0, email: 0, verify: 0, schoolName: 0, code: 0},
      formData: {type: "", name: "", title: "", abstract: "", discipline: "", email: "", verify: "", schoolName: "", code: ""},
      message: "",
      wordcount: 0,
      boxType: "Abstract",
      showConfirmationModal: false,
      submitModal: false,
      schoolName: "",
      apiON: false
    });
    this.menuHandler = this.menuHandler.bind(this);
    this.nameHandler = this.nameHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.abstractHandler = this.abstractHandler.bind(this);
    this.disciplineHandler = this.disciplineHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.verifyHandler = this.verifyHandler.bind(this);
    this.codeHandler = this.codeHandler.bind(this);
    this.email = this.email.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.typeHandler = this.typeHandler.bind(this);
    this.snhandler = this.snhandler.bind(this);//school name

    this.modalHandler = this.modalHandler.bind(this);//confirm screen
    this.post = this.post.bind(this); // post to database
    this.submitModalHandler = this.submitModalHandler.bind(this);
  }

  snhandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.schoolName = 2;
    } else {
      colors.schoolName = 1;
    }
    data.schoolName = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  typeHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "" || e.target.value == "n") {
      colors.type = 2;
    } else {
      colors.type = 1;
    }
    data.type = e.target.value;

    let box = data.type == "Workshop" ? "Description" : "Abstract"

    this.setState({formColors: colors, formData: data, boxType: box});
  }

  submitHandler(e) {
    //type: 0, name: 0, title: 0, abstract: 0, discipline: 0, email: 0, verify: 0, schoolName: 0, code: 0

    if(this.state.formColors.type == 1 && this.state.formColors.name == 1 && this.state.formColors.title == 1 && this.state.formColors.abstract == 1 && this.state.formColors.discipline == 1 && this.state.formColors.email == 1 && this.state.formColors.verify == 1 && this.state.formColors.code == 1) {
      //all green
      //PUSH to database. write code.
      console.log("VALID submission. CONTINUE.");

      axios
      .get("http://localhost:25000/api", {})
      .then(R => {
        this.setState({apiON: true});

        axios
        .get("http://localhost:25000/api/schools/" + this.state.formData.code)
        .then((res) => {
          if(res.data == null) {
            console.log("Invalid code.");
          } else {
            this.setState({schoolName: res.data.schoolname});
          }
        });
  
        this.modalHandler(e);
    }).catch(err => {
      this.setState({submitModal: false, showConfirmationModal: false, message: "There was an error. Please try again. If this continues, please send us an email with your registration info."});
      document.body.classList.remove("stopscroll");
      window.scrollTo(0, 0);
    });
    } else {
      console.log("INVALID submission. STOP.");
      let str = "The form has errors. Please correct them and submit again.";
      this.setState({message: str});
    }
  }

  //can add more functionality here
  modalHandler(e) {
    if(this.state.submitModal) {
      this.submitModalHandler(e);
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

  submitModalHandler(e) {
    let s = !this.state.submitModal;

    if(s) {
      document.body.classList.add("stopscroll")
    } else {
      document.body.classList.remove("stopscroll")
    }

    this.setState({submitModal: s});
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

  titleHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.title = 2;
    } else {
      colors.title = 1;
    }
    data.title = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  abstractHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    let rx_words = /(\s)/g;
    let wc = [...e.target.value.matchAll(rx_words)];
    if(e.target.value == "") {
      colors.abstract = 2;
    } else {
      colors.abstract = 1;

      if(wc.length+1 > 250) {
        colors.abstract = 2;
      }
    }

    data.abstract = e.target.value;
    //data.abstract = wc
    //console.log(wc, wc.length+1);

    this.setState({formColors: colors, formData: data, wordcount: wc.length+1});
  }

  disciplineHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "" || e.target.value == "n") {
      colors.discipline = 2;
    } else {
      colors.discipline = 1;
    }
    data.discipline = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  emailHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    data.email = e.target.value;

    let rx = /(\w+[@]\w+([.]\w+)+)/g; //tests if it's an email
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

    let rx = /(\w+[@]\w+([.]\w+)+)/g; //tests if it's an email
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

  codeHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.code = 2;
    } else {
      colors.code = 1;
    }

    data.code = e.target.value;

    if(data.code.length != 7) {
      colors.code = 2;
    }

    this.setState({formColors: colors, formData: data, schoolName: "..."});
  }

  menuHandler(e) {
    let cState = !this.state.menu;
    this.setState({menu: cState});
  }

  post(e) {
    e.preventDefault();

    axios
      .get("http://localhost:25000/api", {})
      .then(R => {
        this.setState({apiON: true});

        if(this.state.schoolName) {
          let student = {
            type: this.state.formData.type,
            name: this.state.formData.name,
            title: this.state.formData.title,
            abstract: this.state.formData.abstract,
            discipline: this.state.formData.abstract,
            email: this.state.formData.email,
            school: this.state.schoolName
          };
       
          axios
            .post("http://localhost:25000/api/students/add", student)
            .then((res) => {
              this.setState({submitModal: true, showConfirmationModal: false});
            });
        } else {
          let colors = this.state.formColors;
          colors.code = 2;
    
          this.setState({message: "You entered an invalid school code.", showConfirmationModal: false, formColors: colors});
          document.body.classList.remove("stopscroll");
          window.scrollTo(0, 0);
        }

    }).catch(err => {
      this.setState({submitModal: false, showConfirmationModal: false, message: "There was an error. Please try again. If this continues, please send us an email with your registration info."});
      document.body.classList.remove("stopscroll");
      window.scrollTo(0, 0);
    });
  }

  render() {
    let nav = [
      {name: "School Registration", link: "/register", active: 0},
      {name: "Project Submissions", link: "/submit", active: 1},
      {name: "About Us", link: "/about", active: 0},
      {name: "Contact Us", link: "/contact", active: 0},
      {name: "Dates & Deadlines", link: "/timeline", active: 0}
    ];

    let menuWidth = this.state.phone && this.state.menu ? "100vw" : (this.state.menu ? "25vw" : "");
    let colors = ["#82318E", "#119911", "#FF2211"];

    return (
      <div className={styles.earth}>

      <div className={styles.modalBlack} onClick={this.modalHandler} style={{display: (this.state.showConfirmationModal || this.state.submitModal) ? "block" : "none"}}></div>
      <div className={styles.confirmModal} style={{display: this.state.showConfirmationModal ? "block" : "none"}}>
        <div className={styles.wrapper}>
          <>
          <p>Please confirm your submission.</p>
          <p>You will NOT be able to change this information once you submit! Don't close this page until you see a green check mark.</p>
          </>

          <div className={styles.wrapper__text}>
          <p>Name: <span>{this.state.formData.name}</span></p>
          <p>School: <span>{(this.state.schoolName!="...") ? this.state.schoolName : "You entered an invalid code."}</span></p>
          <p>Title of Submission: <span>{this.state.formData.title}</span></p>
          <p>Type of Submission: <span>{this.state.formData.type}</span></p>
          <p>Discipline: <span>{this.state.formData.discipline}</span></p>
          <p>Abstract: <span>{this.state.formData.abstract}</span></p>
          <p>Email: <span>{this.state.formData.email}</span></p>
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
          <p>We will reach out to you via email within 48 hours. Please check your inbox! If we do not reach out, please send us an email at <a href="mailto:isrc@this.edu.cn">isrc@this.edu.cn</a>.</p>
          </>
        </div>
      </div> 
      
      <div className={styles.sidebar}>

        <div style={{width: menuWidth}} onClick={this.menuHandler} className={this.state.menu ? styles.menuactive : styles.menu}>

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

          <div className={styles.form}>
              <p id={styles.formhead}>Project Submission</p>
              <p style={{color: "#FF2211"}}>{this.state.message}</p>

              <span>Type of Submission: <span id={styles.star}>*</span> <br/><select onChange={this.typeHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.type]}`}} required value={this.state.formData.type}>
                
                <option value="n">Please Select</option>
                <option value="Poster">Poster Submission</option>
                <option value="Panel">Panel Submission</option>
                <option value="Workshop">Workshop Application</option>

              </select><br/></span>
              <span>Your Name: <span id={styles.star}>*</span> <br/><input onChange={this.nameHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.name]}`}} required value={this.state.formData.name}></input><br/></span>
              <span>Your Project Title: <span id={styles.star}>*</span> <br/><input onChange={this.titleHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.title]}`}} required value={this.state.formData.title}></input><br/></span>
              <span>{this.state.boxType}: <span id={styles.star}>*</span> <br/><textarea onChange={this.abstractHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.abstract]}`}} required value={this.state.formData.abstract}></textarea>
              <span id={styles.wcword} style={{color: this.state.wordcount>250 ? colors[2] : colors[0]}}>{this.state.wordcount}/250</span>
              
              <br/></span>
              <span>Discipline: <span id={styles.star}>*</span> <br/><select onChange={this.disciplineHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.discipline]}`}} required value={this.state.formData.discipline}>
                
                <option value="n">Please Select</option>
                <option value="Science">Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Math">Math</option>
                <option value="Language Arts">Language Arts</option>
                <option value="Fine Arts">Fine Arts</option>
                <option value="Digital Arts">Digital Arts</option>
                <option value="Physical Education">Physical Education</option>
                
              </select><br/></span>
              <span>Email: <span id={styles.star}>*</span> <br/><input onChange={this.emailHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.email]}`}} required value={this.state.formData.email}></input><br/></span>
              <span>Verify Email: <span id={styles.star}>*</span> <br/><input onChange={this.verifyHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.verify]}`}} required value={this.state.formData.verify}></input><br/></span>
              <span>School Code (case sensitive!): <span id={styles.star}>*</span> <br/><input onChange={this.codeHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.code]}`}} required value={this.state.formData.code}></input><br/></span>

              <p style={{width: "80%"}}>Please submit your information here. You will receive an e-mail confirming submission. If we need additional information, we will contact you.</p>

              <button onClick={this.submitHandler}>Submit</button>
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
        <title>THIS ISRC 2022 - Submission</title>
        <link rel="icon" href="/logo-spartan.svg" />
      </Head>
      <App/>
    </>
  );
}
