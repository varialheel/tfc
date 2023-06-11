// guardamos en una constante la url base de nuestra api
const baseUrl = "http://localhost/api_hospital/";
/**
 * 
 * @param url 
 * @param token 
 * @returns response
 * con get request podremos realizar peticiones del tipo get
 */
const getRequest = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "token": token
      }
    });

    if (!response.ok) {
      if (response.status == 403) {
        sessionStorage.removeItem("user")
        window.location = `http://${window.location.href.split("/")[2]}/index.html`;
      } else {
        return response.status
      }
    }

    return response.json();
  } catch (error) {
    return error;
  }
}
/**
 * 
 * @param url 
 * @param token 
 * @returns response
 * con post request podremos realizar peticiones del tipo post
 */
const postRequest = async (url, data, token = "") => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "token": token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      if (response.status == 403) {
        sessionStorage.removeItem("user")
        window.location = `http://${window.location.href.split("/")[2]}/index.html`;
      } else {
        return response.status
      }
    }

    return response.json();
  } catch (error) {
    return error;
  }
};
/**
 * 
 * @param url 
 * @param token 
 * @returns response
 * con put request podremos realizar peticiones del tipo put
 */
const putRequest = async (url, data, token = "") => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "token": token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      if (response.status == 403) {
        sessionStorage.removeItem("user")
        window.location = `http://${window.location.href.split("/")[2]}/index.html`;
      } else {
        return response.status
      }
    }

    return response.json();
  } catch (error) {
    return error;
  }
};
/**
 * 
 * @param url 
 * @param token 
 * @returns response
 * con delete request podremos realizar peticiones del tipo delete
 */
const deleteRequest = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "token": token
      }
    });

    if (!response.ok) {
      if (response.status == 403) {
        sessionStorage.removeItem("user")
        window.location = `http://${window.location.href.split("/")[2]}/index.html`;
      } else {
        return response.status
      }
    }

    return response.json();
  } catch (error) {
    return error;
  }
};