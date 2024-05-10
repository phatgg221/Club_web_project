import { useEffect, useState } from "react";
import React from "react";
import style from "../../../styles/table.module.css";
import Popup from "reactjs-popup";
import SearchBar from "../../../components/Competitions/SearchBar";
import styleForm from "../../../styles/Admin.Form.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";
const MemberTable = () => {
  const router = useRouter();
  const { isAdmin, isHighestAdmin } = useAuth();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");
  const [members, setMembers] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "1",
    email: "",
    isAdmin: false,
  });

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/member_api`);
        const data = await response.json();
        setMembers(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleSeaerchItem = (searchItem) => {
    setSearchItem(searchItem);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const usernamePattern = /^[sS]\d{7}$/;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    setErrorSubmit("");
    setUsernameError("");

    if (name === "username") {
      if (!usernamePattern.test(value)) {
        setUsernameError(
          'Invalid username. Required format: "sXXXXXXX" or "SXXXXXXX"'
        );
        setErrorSubmit("Invalid format. Cannot submit.");
      } else {
        setUsernameError("");
        setErrorSubmit("");
      }
    }

    if (name === "email") {
      if (!emailPattern.test(value)) {
        setEmailError("Invalid email.");
        setErrorSubmit("Invalid format. Cannot submit.");
      } else {
        setUsernameError("");
        setErrorSubmit("");
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
    try {
      // console.log("akjsdna member id : " + member._id)
      const response = await fetch(`/api/member_api?=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Member delete successful");
        window.location.reload();
      } else {
        console.error("Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting member", error);
    }
  };

  const updateUserAdminStatus = async (userId, isAdmin1) => {
    try {
      const response = await fetch(`/api/member_api?id=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAdmin: isAdmin1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user admin status");
      }

      console.log("User admin status updated successfully");
      window.location.href = "/admin/member/view";
    } catch (error) {
      console.error("Error updating user admin status:", error);
    }
  };

  const filteredMember =
    members &&
    members.data &&
    members.data.mongoData &&
    members.data.mongoData.filter((item) => {
      return item.username.toLowerCase().includes(searchItem.toLowerCase());
    });

  const handleReturn = async () => {
    window.location.href = "/admin/dashboard/view";
  };

  const hanldeSubmit = async () => {
    const usernameExists = members.data.mongoData.some(
      (member) => member.username === formData.username
    );
    if (usernameExists) {
      alert("Account already exists.");
      return;
    }

    if (errorSubmit) {
      alert("Invalid form. Cannot submit.");
      return;
    }

    fetch("/api/member_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        closeModal();

        return response.json();
      })
      .then((data) => console.log("Success: ", data))
      .catch((error) => console.error("Error", error));
  };
  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, router]);

  return (
    <>
      <Popup open={open} closeOnDocumentClick onClose={hanldeSubmit}>
        <form
          style={{
            backgroundColor: "white",
            padding: "20px",
            border: "solid",
            borderColor: "gray",
          }}
          className={styleForm.form}
          onSubmit={hanldeSubmit}
        >
          <label>
            Email:
            <input
              name="email"
              type="email"
              onChange={handleInputChange}
            ></input>
            {emailError && <p className="error">{emailError}</p>}
          </label>
          <h11>Please use personal email</h11>
          <label>
            Username:
            <input
              name="username"
              required={true}
              type="text"
              onChange={handleInputChange}
            ></input>
            {usernameError && <p className="error">{usernameError}</p>}
          </label>
          <label>
            Password: The password will be 1 as default. Member can change it
            later.
          </label>
          <button className={`${style.btn} ${style.btnForm}`} type="submit">
            Create Account
          </button>
        </form>
      </Popup>
      <SearchBar
        showButton={true}
        placeholder="Search for user id"
        onChange={handleSeaerchItem}
      ></SearchBar>
      <div className={style.divTable}>
        <table className={style.mainTable}>
          <thead className={style.tableHeading}>
            <tr className={style.tableRow}>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMember &&
              filteredMember.map((item, index) => (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                  <td className={style.btnContainer}>
                    {item.isAdmin && (
                      <button
                        disabled={!isHighestAdmin}
                        className={`${
                          isHighestAdmin ? style.btn : style.disabledBtn
                        }`}
                        onClick={() => updateUserAdminStatus(item._id, false)}
                      >
                        Make normal member
                      </button>
                    )}
                    {!item.isAdmin && (
                      <button
                        disabled={!isHighestAdmin}
                        className={`${
                          isHighestAdmin ? style.btn : style.disabledBtn
                        }`}
                        onClick={() => updateUserAdminStatus(item._id, true)}
                      >
                        Make admin
                      </button>
                    )}
                  </td>
                  <td className={style.btnContainer}>
                    <button
                      className={`${style.btn} ${style.btnTable}`}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={style.btnBottomDiv}>
        <button
          className={`${style.btn} ${style.btnBottom}`}
          onClick={openModal}
        >
          Create a new account
        </button>
        <button
          className={`${style.btn} ${style.btnBottom}`}
          onClick={handleReturn}
        >
          Return to dashboard
        </button>
      </div>
    </>
  );
};

MemberTable.hideLayout = true;
export default MemberTable;
