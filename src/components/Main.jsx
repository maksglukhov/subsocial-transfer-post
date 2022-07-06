import React, { useEffect, useState } from "react";
import "../css/main.css";
import { Client } from "twitter-api-sdk";

function Main() {
  const client = new Client(process.env.BEARER_TOKEN);
  const [url, setUrl] = useState("");

  async function post(e) {
    e.preventDefault();
    //let twit = parseUrl(url);

    const tweet = await client.tweets.findTweetsById("1544636989647032321");
    console.log(tweet.data.text);
  }
  function parseUrl(url) {
    console.log(url);
  }

  return (
    <div className='main'>
      <div className='input-group mb-3 justify-content-center'>
        <div className='input-group-prepend text-center'>
          <form className='form-signin' onSubmit={(e) => post(e)}>
            <h1 className='h3 mb-3 font-weight-normal'>
              Please paste twitter url
            </h1>
            <div className='d-flex p-2'>
              <input
                type='urls'
                id='inputUrl'
                className='form-control'
                placeholder='url'
                required
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button className='btn btn-lg btn-primary btn-block'>
              Transfer post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Main;
