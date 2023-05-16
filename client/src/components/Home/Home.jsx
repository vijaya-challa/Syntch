/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './home_style.scss';
import { NavLink } from 'react-router-dom';
import syntch_logo from '../../assets/images/syntch_logo.png';

function Home() {
  return (
    <div className="homeContainer">
      <img src={syntch_logo} alt="Syntch Logo" style={{ color: 'white', width: '250px' }} />
      <h5>Syntch Home Component</h5>

      <div className="openerContainer">
        <NavLink to="/howtoplaygame">
          <button className="opener">How To Play</button>
        </NavLink>

        <NavLink to="/tasksection">
          <button className="opener">Try</button>
        </NavLink>

        <NavLink to="/login">
          <button className="opener">Login</button>
        </NavLink>

        <NavLink to="/register">
          <button className="opener">Register</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
