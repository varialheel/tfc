const baseUrl = "http://localhost/api_hospital/";
const getRequest = async (url,token)=>{
    try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "token": token
          }
        });
    
        if (!response.ok) {
          return response.status
        }
    
        return response.json();
      } catch (error) {
        // Handle the error
        return error; // You can choose to return a custom error object or handle it differently
      }
}
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
      return response.status
    }

    return response.json();
  } catch (error) {
    // Handle the error
    return error; // You can choose to return a custom error object or handle it differently
  }
};
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
      return response.status
    }

    return response.json();
  } catch (error) {
    // Handle the error
    return error; // You can choose to return a custom error object or handle it differently
  }
};