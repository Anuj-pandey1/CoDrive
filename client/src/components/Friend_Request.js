import React from "react";
import { useState } from "react";

const Friend_Request = () => {
  const [SearchUserid, setSearchUserid] = useState("");
  const [FoundUserid, setFoundUserid] = useState({});
  const [FriendRequest, setFriendRequest] = useState("Send Friend Request");
  const handleClick = () => {
    fetch(`http://localhost:8100/friend_request/${SearchUserid}`)
      .then((response) => response.json())
      .then((data) => setFoundUserid(data))
      .catch((error) => console.error(error));
  };

  const handleFriendRequest = () => {
    setFriendRequest("Friend request sent!");
    console.log(FoundUserid.user_id);
    fetch("http://localhost:8100/friend_request/sendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FoundUserid),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <div class="input-group w-50">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={SearchUserid}
            onChange={(e) => {
              setSearchUserid(e.target.value);
            }}
          />
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={handleClick}
          >
            search
          </button>
        </div>
      </div>

      <section>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-md-9 col-lg-7 col-xl-5">
              <div class="card">
                <div class="card-body p-4">
                  {(() => {
                    if (FoundUserid.data_exist == false) {
                      return (
                        <div class="d-flex text-black">
                          <div class="flex-grow-1 ms-3">
                            <h5 class="mb-1">
                              No user with the searched username found
                            </h5>
                          </div>
                        </div>
                      );
                    } else if (FoundUserid.travel_type == null) {
                      return (
                        <div class="d-flex text-black">
                          <div class="flex-grow-1 ms-3">
                            <h5 class="mb-1">Please search id</h5>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div class="d-flex text-black">
                          <div class="flex-grow-1 ms-3">
                            <h5 class="mb-1">Name</h5>
                            <p class="mb-2 pb-1">Contact</p>
                            <p class="mb-2 pb-1">Email</p>
                            {/* <div class="d-flex justify-content-start rounded-3 p-2 mb-2">
                          <div>
                            <p class="small text-muted mb-1">Articles</p>
                            <p class="mb-0">41</p>
                          </div>
                          <div class="px-3">
                            <p class="small text-muted mb-1">Followers</p>
                            <p class="mb-0">976</p>
                          </div>
                          <div>
                            <p class="small text-muted mb-1">Rating</p>
                            <p class="mb-0">8.5</p>
                          </div>
                        </div> */}
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
                                onClick={handleFriendRequest}
                              >
                                {FriendRequest}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Friend_Request;
