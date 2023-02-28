import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="left">
                <ul>
                <li><p>&copy; 2023 - @ Oculus Architectural Engineering Ltd</p></li>
                <li>
                    <a href="#">Privacy Statement</a>
                    <a href="#">Terms and Conditions</a>
                </li>
                </ul>
            </div>
            <div className="right">
                <ul>
                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                </ul>
                <img src="../Reverse White Oculus Logo transparent bg.png" alt="Oculus NZ"/>
            </div>
        </footer>
    );
};

export default Footer();