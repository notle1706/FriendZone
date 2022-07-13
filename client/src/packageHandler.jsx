import React, { useState, useEffect } from "react";
import axios from "axios";

export async function getModsData() {
  const url = "https://api.nusmods.com/v2/2021-2022/moduleList.json";

  try {
    const response = await axios.get(url);
    const fullData = await response.data;

    return fullData;
  } catch (e) {
    console.error("Error in packageHandler" + e);
  }
}
