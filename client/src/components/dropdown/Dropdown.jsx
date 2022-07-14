import React, { useState, useEffect } from "react";
import "./dropdown.css";
import axios from "axios";
import Select from "react-select";

export default function Dropdown(props) {
  const url = "https://api.nusmods.com/v2/2021-2022/moduleList.json";
  const [openMenu, setOpenMenu] = useState(false);
  const [modsData, setModsData] = useState();
  async function fetchModsData() {
    const response = await axios.get(url);
    const fullData = await response.data;
    const modsData = fullData.map((course) => {
      var info = {
        value: course.moduleCode,
        label: `${course.moduleCode}: ${course.title} `,
      };
      return info;
    });
    setModsData(modsData);
  }
  useEffect(() => {
    fetchModsData();
  }, []);

  const hideMenu = () => {
    setOpenMenu(false);
  };

  const handleInputChange = (input) => {
    if (input.length > 3) {
      setOpenMenu(true);
    }
    if (input.length <= 3) {
      hideMenu();
    }
  };

  if (!modsData) {
    return <>Loading!</>;
  }

  return (
    <>
      <Select
        options={modsData}
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
