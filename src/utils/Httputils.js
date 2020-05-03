export async function getRequestData(fetchUrl, method = "GET", body = {}) {
  if (method === "GET") {
    return await (
      await fetch(fetchUrl, {
        credentials: "include",
      })
    ).json();
  } else {
    return await (
      await fetch(fetchUrl, {
        credentials: "include", // include, *same-origin, omit
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body), // body data type must match "Content-Type" header
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    ).json();
  }
}
