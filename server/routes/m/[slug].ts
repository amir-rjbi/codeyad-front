import { IApiResponse } from "./../../../models/IApiResponse";
import { BASE_URL, CurrentDomainUrl } from "./../../../utils/api.config";
export default defineEventHandler(async (event) => {
  var shortLink = event.req.url?.split("/")[2];
  console.log(shortLink)
  if (shortLink) {
    var url = `${BASE_URL}/shortLink/m/${shortLink}`;
    try {
      var res = await $fetch<string>(url);
      var redirectUrl = `${CurrentDomainUrl}/masters/profile-${res}`;
      event.res.writeHead(301, { location: `${redirectUrl}` });
      event.res.end();
    } catch {
      event.res.writeHead(401, { location: `/` });
    }
  }
});
