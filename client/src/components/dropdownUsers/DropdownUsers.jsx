import React, { useState, useEffect } from "react";
import "./dropdownusers.css";
import axios from "axios";
import Select from "react-select";
import { getAllUsers } from "../../firebase";

export default function DropdownUsers(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [usersData, setUsersData] = useState();
  async function fetchUsersData() {
    const response = await getAllUsers();
    var temp = [];
    response.forEach((doc) => {
      const data = {
        value: doc.data().email,
        label: doc.data().displayName,
      };
      temp = [...temp, data];
    });

    setUsersData(temp);
  }
  useEffect(() => {
    fetchUsersData();
  }, []);

  const hideMenu = () => {
    setOpenMenu(false);
  };

  const handleInputChange = (input) => {
    if (input.length >= 1) {
      setOpenMenu(true);
    }
    if (input.length < 1) {
      hideMenu();
    }
  };

  if (!usersData) {
    return <>Loading!</>;
  }

  return (
    <>
      <Select
        options={usersData}
        menuIsOpen={openMenu}
        placeholder={props.placeholder}
        onInputChange={handleInputChange}
        onChange={(event) => {
          hideMenu();
          props.onchange(event);
        }}
        onBlur={hideMenu}
      />
    </>
  );
}
