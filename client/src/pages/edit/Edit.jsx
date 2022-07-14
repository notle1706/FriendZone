import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./edit.css";
import {
  auth,
  setUserInfo,
  getUserEmail,
  getUserInfo,
  uploadFiles,
} from "../../firebase";
import Select from "react-select";
import { getModsData } from "../../packageHandler";
import Dropdown from "../../components/dropdown/Dropdown";
import Button from "react-bootstrap/Button";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";

export default function Edit() {
  const [user, setUser] = useState("info placeholder");
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();

  const routeBack = () => {
    let path = "/dashboard/profile";
    navigate(path);
  };

  useEffect(() => {
    const getData = async () => {
      const newUserEmail = await getUserEmail();
      const user = await getUserInfo(newUserEmail);
      setUserEmail(newUserEmail);
      setUser(user);
    };
    getData();
    return () => console.log("cleanup get user");
  }, []);

  if (!user) {
    return <>Loading!</>;
  }

  const [modsData, setModsData] = useState();
  const [dname, setDname] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [course, setCourse] = useState();
  const [mods, setMods] = useState(["loading"]);
  const [year, setYear] = useState();
  const [teleHandle, setTeleHandle] = useState();
  const [bday, setBday] = useState();
  const [displayMods, setDisplayMods] = useState();
  const [picurl, setPicUrl] = useState();

  useEffect(() => {
    setMods(user.modulesTaken);
    setDname(user.displayName);
    setFname(user.firstName);
    setLname(user.lastName);
    setCourse(user.course);
    setTeleHandle(user.teleHandle);
    setYear(user.year);
    setBday(user.birthday);
    setPicUrl(user.profilePicture);
    return () => console.log("cleanup set user information");
  }, [user]);

  useEffect(() => {
    if (mods) {
      setDisplayMods(
        mods.map((mod) => {
          return (
            <span>
              <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary">
                  {mod}
                </button>
                <button
                  onClick={() => handleDelete(mod)}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  X
                </button>
              </div>
            </span>
          );
        })
      );
    }
    return () => console.log("cleanup render mod buttons");
  }, [mods]);

  async function submitChanges() {
    await setUserInfo(userEmail, "displayName", dname);
    await setUserInfo(userEmail, "firstName", fname);
    await setUserInfo(userEmail, "lastName", lname);
    await setUserInfo(userEmail, "course", course);
    await setUserInfo(userEmail, "year", year);
    await setUserInfo(userEmail, "teleHandle", teleHandle);
    await setUserInfo(userEmail, "birthday", bday);
    await setUserInfo(userEmail, "modulesTaken", mods);
  }

  useEffect(() => {
    (async () => {
      const fullData = await getModsData();
      const modsData = fullData.map((course) => {
        var info = {
          value: course.moduleCode,
          label: `${course.moduleCode}: ${course.title} `,
        };
        return info;
      });
      setModsData(modsData);
    })();
    return () => console.log("cleanup get mods data");
  }, []);
  if (!modsData) {
    return <>Loading!</>;
  }

  const handleChange = (event) => {
    setMods([...mods, event.value]);
  };
  const handleDelete = (mod) => {
    setMods(
      mods.filter(function (value, index, arr) {
        return value != mod;
      })
    );
  };

  const handleUploadImg = async (event) => {
    event.preventDefault();
    const file = event.target[0].files[0];
    const url = await uploadFiles(file);
    await setUserInfo(userEmail, "profilePicture", url);
  };

  return (
    <>
      <div class="container-xl px-4 mt-4">
        {/* Account page navigation*/}
        <hr class="mt-0 mb-4" />
        <div class="row">
          <div class="col-xl-4">
            {/* Profile picture card-edit*/}
            <div class="card-edit mb-4 mb-xl-0">
              <div class="card-edit-header">Profile Picture</div>
              <div class="card-edit-body text-center">
                {/* Profile picture image*/}
                <img
                  class="img-account-profile rounded-circle mb-2"
                  src={picurl}
                  alt=""
                />
                {/* Profile picture help block*/}
                <div class="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                {/* Profile picture upload button*/}
                <form onSubmit={handleUploadImg}>
                  <input
                    type="file"
                    class="form-control-file"
                    id="FormControlFile1"
                  />
                  <button type="submit">Upload pic</button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            {/*Account details card-edit*/}
            <div class="card-edit mb-4">
              <div class="card-edit-header account-details">
                Account Details
              </div>
              <div class="card-edit-body">
                <form>
                  {/* Form Group (username)*/}
                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <input
                      class="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      onChange={(event) => {
                        setDname(event.target.value);
                      }}
                      defaultValue={dname}
                    />
                  </div>
                  {/* Form Row*/}
                  <div class="row gx-3 mb-3">
                    {/* Form Group (first name)*/}
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        onChange={(event) => {
                          setFname(event.target.value);
                        }}
                        defaultValue={fname}
                      />
                    </div>
                    {/* Form Group (last name)*/}
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        onChange={(event) => {
                          setLname(event.target.value);
                        }}
                        defaultValue={lname}
                      />
                    </div>
                  </div>
                  {/* Form Row        */}
                  <div class="row gx-3 mb-3">
                    {/* Form Group (Course)*/}
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputCourse">
                        Course
                      </label>
                      <input
                        class="form-control"
                        id="inputCourse"
                        type="text"
                        placeholder="Enter your Course"
                        onChange={(event) => {
                          setCourse(event.target.value);
                        }}
                        defaultValue={course}
                      />
                    </div>
                    {/* Form Group (year)*/}
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputYear">
                        Year of Study
                      </label>
                      <input
                        class="form-control"
                        id="inputYear"
                        type="text"
                        placeholder="Enter your year of study"
                        onChange={(event) => {
                          setYear(event.target.value);
                        }}
                        defaultValue={year}
                      />
                    </div>
                  </div>
                  {/* Form Group (modules)*/}
                  <div class="mb-3">
                    <label class="small mb-1" for="inputModules">
                      Modules taken
                    </label>
                    <div className="ml-1">
                      <Dropdown
                        onchange={handleChange}
                        placeholder="Add a module here!"
                      />
                    </div>
                    <div className="mt-2">{displayMods}</div>
                  </div>
                  {/* Form Group (email address)*/}
                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      class="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      defaultValue={userEmail}
                    />
                  </div>
                  {/* Form Row*/}
                  <div class="row gx-3 mb-3">
                    {/* Form Group (telegram handle)*/}
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputTelegram">
                        Telegram handle
                      </label>
                      <input
                        class="form-control"
                        id="inputTelegram"
                        type="text"
                        placeholder="Enter your telegram handle"
                        onChange={(event) => {
                          setTeleHandle(event.target.value);
                        }}
                        defaultValue={teleHandle}
                      />
                    </div>
                    {/* Form Group (birthday)*/}
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">
                        Birthday
                      </label>
                      <input
                        class="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        onChange={(event) => {
                          setBday(event.target.value);
                        }}
                        defaultValue={bday}
                      />
                    </div>
                  </div>
                  {/* Save changes button*/}
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={async () => {
                      await submitChanges();
                      routeBack();
                    }}
                  >
                    Save changes
                  </button>
                  <button
                    class="btn btn-secondary discard-button"
                    type="button"
                    onClick={routeBack}
                  >
                    Discard changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
