import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className={"app-footer"}>
            <div className={"footer-right"}>
                <NavLink to={"/mentions-legales"} className={"footer-link"}>
                    Mentions légales
                </NavLink>
            </div>
            <div className={"footer-left"}>© 2025 Réalisé par Théo DILL</div>
        </footer>
    );
};

export default Footer;