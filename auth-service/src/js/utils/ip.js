import axios from "axios";

export async function getIpData() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const detailsResponse = await axios.get(`https://ipapi.co/${response.data.ip}/json/`);

    return detailsResponse.data;
  } catch (error) {
    throw new Error(`Error getting IP data: ${error}`)
  }
}
