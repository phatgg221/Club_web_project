import { useEffect, useState } from "react";
import React from "react";
import style from "../../../styles/table.module.css";
import SearchBar from "../../../components/Competitions/SearchBar";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
const SampleTable = () => {
  const [ongoingCompetitions, setOngoingCompetitions] = useState([]);
  const [searchTerm, setSearchItem] = useState("");
  const { isAdmin } = useAuth();
  const router = useRouter();
  const handleSearchInput = (searchTerm) => {
    setSearchItem(searchTerm);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const competitionsResponse = await fetch("/api/sample_api");
        const competitionsData = await competitionsResponse.json();
        setOngoingCompetitions(competitionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (sample) => {
    try {
      const response = await fetch(`/api/sample_api?id=${sample._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Sample delete successful");
        window.location.reload();
      } else {
        console.error("Failed to delete sample");
      }
    } catch (error) {
      console.error("Error deleting sample", error);
    }
  };
  const handleReturn = async () => {
    window.location.href = "/admin/dashboard/view";
  };

  const handleCreateButton = async () => {
    window.location.href = "/admin/sample/form";
  };

  const handleUpdateButton = async (id) => {
    console.log("ID to update " + id);
    window.location.href = `/admin/sample/form?id=${id}`;
  };

  const filteredTips =
    ongoingCompetitions &&
    ongoingCompetitions.data &&
    ongoingCompetitions.data.mongoData &&
    ongoingCompetitions.data.mongoData.filter((item) => {
      return item.sampleName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  return (
    <>
      <SearchBar
        placeholder="Search for sample"
        onChange={handleSearchInput}
        showButton={true}
      ></SearchBar>
      <div className={style.divTable}>
        <table className={style.mainTable}>
          <thead className={style.tableHeading}>
            <tr>
              <th>Sample Name</th>
              <th>Contents / Topics</th>
              <th>Author</th>
              <th>Sample link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTips &&
              filteredTips.map((item, index) => (
                <tr className={style.tableRow} key={index}>
                  <td>{item.sampleName}</td>
                  <td>{item.sampleContents}</td>
                  <td>{item.sampleAuthor}</td>
                  <td>
                    <Link href={item.sampleLink}>Link</Link>
                  </td>
                  <td className={style.btnContainer}>
                    <div className={style.btnTableDiv}>
                      <button
                        className={`${style.btn} ${style.btnTable}`}
                        onClick={() => handleUpdateButton(item._id)}
                      >
                        Update
                      </button>
                      <button
                        className={`${style.btn} ${style.btnTable}`}
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={style.btnBottomDiv}>
        <button
          className={`${style.btn} ${style.btnBottom}`}
          onClick={handleCreateButton}
        >
          Create
        </button>
        <button
          className={`${style.btn} ${style.btnBottom}`}
          onClick={handleReturn}
        >
          Return
        </button>
      </div>
    </>
  );
};
SampleTable.hideLayout = true;
export default SampleTable;
