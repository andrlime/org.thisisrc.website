import React from "react";
import styles from '../styles/Q.module.css';

export const FooterComp = () => {
    return (
        <div className={styles.imgbox}><img src="logo_isrc.png"/><img src="school_logo_highres.png"/></div>
    )
}

module.exports = {
    FooterComp: FooterComp
};

export default FooterComp;