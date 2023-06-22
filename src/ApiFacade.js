const WEB_URL = "http://localhost:8080/api/";

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  async function login(username, password) {
    const options = makeOptions("POST", true, {
      username: username,
      password: password,
    });
    const data = await fetch(WEB_URL + "login", options);
    const res = await data.json();
    return res;
  }

  //Create user fucntion
  async function createUser(user) {
    const options = makeOptions("POST", true, user);
    const data = await fetch(WEB_URL + "signup", options);
    const res = await data.json();
    return res;
  }

  //Get all users 
async function getAllUsers() {
  const options = makeOptions("GET", true);
  const data = await fetch(WEB_URL + "user", options);
  const res = await data.json();
  return res;
}


  // Events and functions


  // Create Event
 
async function createEvent(event) {
  const options = makeOptions("POST", true, event);
  const data = await fetch(WEB_URL + "dinnerevent", options);
  const res = await data.json();
  return res;
}


 // Get events
  async function getEvents() {
    const options = makeOptions("GET", true);
    const data = await fetch(WEB_URL + "dinnerevent", options);
    const res = await data.json();
    return res;
  }

//Delete events
async function deleteEvent(event_id) {
  const options = makeOptions("DELETE", true);
  const data = await fetch(WEB_URL + "dinnerevent/" + event_id, options);
  const res = await data.json();
  return res;
}

//Update event
async function updateEvent(event_id, event) {
  return fetch(WEB_URL + 'dinnerevent', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: event_id,
          eventName: event.eventName,
          time: event.time,
          location: event.location,
          dish: event.dish,
          pricePerPerson: event.pricePerPerson,
      })
  })
  .then(response => {
    if (response.status === 200) {
      alert("Updated Event");
    } else {
      alert(" Error ");
    }
  })
  .catch(error => {
      console.error(error);
  });
}

//Assignments and functions


// Create Assignment
async function createAssignment(assignment) {
  try {
    const options = makeOptions("POST", true, assignment);
    const response = await fetch(`${WEB_URL}assignment`, options);
    if (!response.ok) {
      throw new Error("Failed to create assignment");
    }
    const createdAssignment = await response.json();
    return createdAssignment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


//Get Assignments
async function getAssignments() {
  const options = makeOptions("GET", true);
  const data = await fetch(WEB_URL + "assignment/all", options);
  const res = await data.json();
  return res;
}


  // fetch data and catch possible errors
  async function fetchAdminData() {
    const options = makeOptions("GET", true);
    const data = await fetch(WEB_URL + "info/admin", options);
    return data.json();
  }

  async function fetchUserData() {
    const options = makeOptions("GET", true);
    const data = await fetch(WEB_URL + "info/user", options);
    return data.json();
  }
  async function fetchData(url) {
    const options = makeOptions("GET", true);
    const data = await fetch(url, options);
    return data.json();
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  function readJwtToken(token) {
    // console.log('TOKEN opened with atob: ',window.atob(token));
    var base64Url = token.split(".")[1];
    // console.log(base64Url);
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // console.log(base64);
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchAdminData,
    fetchUserData,
    readJwtToken,
    fetchData,
    createUser,
    createEvent,
    deleteEvent,
    updateEvent,
    getEvents,
    updateEvent,
    getAllUsers,
    getAssignments,
    createAssignment,



  };
}
const facade = apiFacade();
export default facade;
