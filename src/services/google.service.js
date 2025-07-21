const axios = require("axios");

module.exports = {
  getGoogleUserInfo: async (accessToken) => {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  },
};
