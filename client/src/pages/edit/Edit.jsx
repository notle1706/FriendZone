import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./edit.css";
import { auth, setUserInfo, getUserEmail, getUserInfo } from "../../firebase";
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
  }, [user]);

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

  useEffect(() => {
    setMods(user.modulesTaken);
  }, [user]);

  useEffect(() => {
    if (mods) {
      setDisplayMods(
        mods.map((mod) => {
          return <Button>{mod}</Button>;
        })
      );
    }
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

  useEffect(
    () =>
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
      })(),
    []
  );
  if (!modsData) {
    return <>Loading!</>;
  }

  const handleChange = (event) => {
    setMods([...mods, event.value]);
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
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                {/* Profile picture help block*/}
                <div class="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                {/* Profile picture upload button*/}
                <input
                  type="file"
                  class="form-control-file"
                  id="FormControlFile1"
                />
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
                      defaultValue={user.displayName}
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
                        defaultValue={user.firstName}
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
                        defaultValue={user.lastName}
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
                        defaultValue={user.course}
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
                        defaultValue={user.year}
                      />
                    </div>
                  </div>
                  {/* Form Group (modules)*/}
                  <div class="mb-3">
                    <label class="small mb-1" for="inputModules">
                      Modules taken
                    </label>
                    <div className="ml-1">
                      <Dropdown onchange={handleChange} />
                    </div>
                    <div>{displayMods}</div>
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
                        defaultValue={user.teleHandle}
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
                        defaultValue={user.birthday}
                      />
                    </div>
                  </div>
                  {/* Save changes button*/}
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={submitChanges}
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
