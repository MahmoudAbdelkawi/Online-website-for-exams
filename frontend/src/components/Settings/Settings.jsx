import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Input } from "reactstrap";

function Settings() {
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getAllUsers = async () => {
      await axios.post("http://localhost:5000/getAllUsers").then(({ data }) => {
        setdata(data);
      });
    };
    getAllUsers();
  }, []);
  const handleDeleteID = async (id) => {
    let newStd = data.filter((el) => el._id !== id);
    setdata(newStd);
    await axios.post("http://localhost:5000/deleteUser", { id });

    //let newStd = data.filter(el => el._id !== id)
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const renderUsers = () => {
    return data
      .filter((el) => el.name.includes(search))
      .map((el, index) => {
        return (
          <div className="d-flex justify-content-between m-3" key={index}>
            <Link
              className="text-decoration-none rounded rounded-md my-1 w-100 align-items-center"
              to={`user/${el._id}`}
            >
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold mb-3">{el.name}</div>
                </div>
              </li>
            </Link>
            <div
              className="m-auto p-3 "
              onClick={(e) => handleDeleteID(el._id)}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className={`text-secondary cursor-pointer`}
              />
            </div>
          </div>
        );
      });
  };
  return (
    <div>
      <div className="container mt-4">
        <Input onChange={handleChange} placeholder="search" />
      </div>

      <div>
        <ol className="list-group">{renderUsers()}</ol>
      </div>
    </div>
  );
}

export default Settings;
