import React from "react";
import { useState, useEffect } from "react";

const View_Friends = () => {
  const [data, setData] = useState([]);
  const [remove, setRemove] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8100/friend_request/getFriends"
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleRemoveFriend = (id) => {
    console.log("removing");
    setRemove({
      ...remove,
      [id]: "Removed",
    });

    fetch("http://localhost:8100/friend_request/removeFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5 mb-4">
        <div class="input-group w-50 d-flex justify-content-center align-items-center">
          <h2>These are your friends</h2>
        </div>
      </div>

      <section>
        {data.map((item) => (
          <div class="container py-1 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col col-md-9 col-lg-7 col-xl-5">
                <div class="card">
                  <div class="card-body p-4">
                    <div class="d-flex text-black">
                      <div class="flex-grow-1 ms-3">
                        <h5 class="mb-1">{item.user_id}</h5>
                        <p class="mb-2 pb-1">Contact</p>
                        <p class="mb-2 pb-1">Email</p>
                        <div class="d-flex pt-1">
                          <button
                            type="button"
                            class="btn btn-outline-primary me-1 flex-grow-1"
                          >
                            Chat
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary flex-grow-1"
                            onClick={() => handleRemoveFriend(item._id)}
                            disabled={remove[item._id] ? true : false}
                          >
                            {remove[item._id] || "Remove"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default View_Friends;
