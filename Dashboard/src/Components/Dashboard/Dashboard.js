import axios from "axios";
import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  Fragment,
} from "react";
import "./Dashboard.css";
import { MyContext } from "../../Authentication";
import Account from "../Account/Account";

const Dashboard = () => {

  const sidebar = useRef(null);
  const mainContext = useContext(MyContext);
  
  // Logged User data from Session storage
  const Session = sessionStorage.getItem("LoggedUser");
  const UserData = JSON.parse(Session);

  const [Employees, setEmployees] = useState({});
  const [tab, setTab] = useState("");
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/EMP")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log("you got an Error"));
  }, [refresh]);

  const [editEmp, setEditEmp] = useState(false);
  // Edit Function()
  const Edit = (e, id) => {
    let editDetails = {
      Emp_Code: "",
      Name: "",
      Profile: "",
      Email: "",
      Company: "ValueCoder",
    };
    [...e.target.parentElement.parentElement.children].forEach((td) => {
      if (td.firstChild.tagName === "INPUT") {
        td.firstChild.disabled = false;
        editDetails = {
          ...editDetails,
          [td.firstChild.name]: td.firstChild.value,
        };
      }
    });
    setEditEmp(editDetails);
  };
  //   Save Function()
  const Save = (e, id) => {
    [...e.target.parentElement.parentElement.children].forEach((td) => {
      if (td.firstChild.tagName === "INPUT") td.firstChild.disabled = true;
    });
    axios.put("http://localhost:3004/EMP/" + id, editEmp);
    setEditEmp(false);
    refresh?setrefresh(false):setrefresh(true)
  };

  const Delete = (id) => {
    axios.delete("http://localhost:3004/EMP/" + id);
    refresh?setrefresh(false):setrefresh(true)
  };

  return (
    <div>
      <div className="sidebar" ref={sidebar}>
        <div className="sidebar-brand">
          <h1>
            {" "}
            <img src="Assets/H Logo.png" width={"50"} alt="H-Coder" />
            <span>H-Coder</span>
          </h1>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="#" className="active" onClick={() => setTab("")}>
                <span className="fas fa-tachometer-alt"></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setTab("")}>
                <span className="fas fa-users"></span>
                <span>Customers</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setTab("")}>
                <span className="fas fa-stream"></span>
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setTab("account")}>
                <span className="fas fa-user-circle"></span>
                <span>Account</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setTab("")}>
                <span className="fas fa-tasks"></span>
                <span>Tasks</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={() => {
                  mainContext.setToken(false);
                  sessionStorage.clear();
                }}
              >
                <span className="fas fa-sign-out-alt"></span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <header>
          <h2>
            <label
              htmlFor="nav-toggle"
              onClick={() =>
                [...sidebar.current.classList].includes("sidebarToggle")
                  ? sidebar.current.classList.remove("sidebarToggle")
                  : sidebar.current.classList.add("sidebarToggle")
              }
            >
              <span className="fas fa-bars"></span>
              Dashboard
            </label>
          </h2>

          <div className="search-wrapper">
            <span className="fas fa-search"> </span>
            <input type="search" placeholder="Search..." />
          </div>

          <div className="user-wrapper" onClick={() => setTab("account")}>
            <img
              src="https://i.ibb.co/yNGW4gg/avatar.png"
              width="40px"
              height="40px"
              alt="profile-img"
            />
            <div className="">
              <h4>{UserData.name}</h4>
              <small>MERN Developer</small>
            </div>
          </div>
        </header>

        <main>
          {tab === "account" ? (
            <Account />
          ) : (
            <Fragment>
              <div className="cards">
                <div className="card-single">
                  <div>
                    <h1>{Employees.length}</h1>
                    <span>Team Members</span>
                  </div>
                  <div>
                    <span className="fas fa-users"></span>
                  </div>
                </div>
                <div className="card-single">
                  <div>
                    <h1>10</h1>
                    <span> Pending Projects</span>
                  </div>
                  <div>
                    <span className="fas fa-clipboard-list"></span>
                  </div>
                </div>
                <div className="card-single">
                  <div>
                    <h1>15</h1>
                    <span>Project Completed</span>
                  </div>
                  <div>
                    <span className="fas fa-shopping-cart"></span>
                  </div>
                </div>
                <div className="card-single">
                  <div>
                    <h1>12 Hours</h1>
                    <span>Average Time</span>
                  </div>
                  <div>
                    <span className="fas fa-wallet"></span>
                  </div>
                </div>
              </div>

              <div className="recent-grid">
                <div className="projects">
                  <div className="card">
                    <div className="card-header">
                      <h2>My Team</h2>
                      <button>
                        See all <span className="fas fa-arrow-right"></span>{" "}
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table width="100%">
                          <thead>
                            <tr>
                              <td>ID</td>
                              <td>EMP_Code</td>
                              <td>Name</td>
                              <td>Email</td>
                              <td>Profile</td>
                            </tr>
                          </thead>
                          <tbody>
                            {[...Employees].map(
                              ({ id, Emp_Code, Name, Email, Profile }) => (
                                <tr key={id}>
                                  <td>
                                    <span className="status orange"></span>
                                    {id}
                                  </td>
                                  <td>
                                    <input
                                      type={"text"}
                                      value={editEmp ? editEmp.name : Emp_Code}
                                      name="Emp_Code"
                                      onChange={(e) =>
                                        setEditEmp({
                                          ...editEmp,
                                          [e.target.name]: e.target.value,
                                        })
                                      }
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type={"text"}
                                      value={editEmp ? editEmp.name : Name}
                                      name="Name"
                                      onChange={(e) =>
                                        setEditEmp({
                                          ...editEmp,
                                          [e.target.name]: e.target.value,
                                        })
                                      }
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type={"text"}
                                      value={editEmp ? editEmp.name : Email}
                                      name="Email"
                                      onChange={(e) =>
                                        setEditEmp({
                                          ...editEmp,
                                          [e.target.name]: e.target.value,
                                        })
                                      }
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type={"text"}
                                      value={editEmp ? editEmp.name : Profile}
                                      name="Profile"
                                      onChange={(e) =>
                                        setEditEmp({
                                          ...editEmp,
                                          [e.target.name]: e.target.value,
                                        })
                                      }
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    {" "}
                                    <button
                                      onClick={(e) => {
                                        if (e.target.textContent === "Edit") {
                                          Edit(e, id);
                                          e.target.textContent = "Save";
                                        } else {
                                          Save(e, id);
                                          e.target.textContent = "Edit";
                                        }
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </td>
                                  <td>
                                    {" "}
                                    <button onClick={() => Delete(id)}>
                                      Delete{" "}
                                      <span className="fas fa-edit"></span>
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
