export async function GET() {
  const res = await fetch(
    process.env.GETROUTEAPI!,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "Application-Name": "web",
        "Application-Version": "4.0.0",
        "X-CORS-Header": "iaWg3pchvFx48fY",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        Priority: "u=4",
      },
      referrer: "https://temp-mail.io/",
      body: '{"min_name_length":10,"max_name_length":10}',
      method: "POST",
      mode: "cors",
    }
  );

  const rawText = await res.text();
  const data = JSON.parse(rawText);
  return new Response(data.email);
}

export async function POST(req: Request) {
  const body = await req.json(); // grabs JSON from POST request
  const res = await fetch(
    `${process.env.POSTROUTEAPI}${body.email}/messages`,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "Application-Name": "web",
        "Application-Version": "4.0.0",
        "X-CORS-Header": "iaWg3pchvFx48fY",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        Priority: "u=4",
      },
      referrer: "https://temp-mail.io/",
      method: "GET",
      mode: "cors",
    }
  );
  const data = await res.text();
  return new Response(data);
}
