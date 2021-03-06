import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Input } from "../Components/Input";
import { Loading } from "../Components/Loading";
import { Row } from "../Components/Row";

export default function Home() {
  const [url, seturl] = useState("");
  const [succses, setsuccses] = useState(false);
  const [convert, setconvert] = useState(false);
  const [title, setTitle] = useState("");
  const [videoDetail, setVideoDetail] = useState("");
  const [time, settime] = useState(null);

  const change = (e) => {
    seturl(e.target.value);
  };

  const send = async (e) => {
    if (url === "") {
      return alert("please enter url !");
    } else {
      setconvert(true);
      e.preventDefault();
      await axios
        .post("/api/download", { url })
        .then((req) => {
          setVideoDetail(req.data.video);
          settime(req.data.time)
          setTitle(req.data.title);
          setsuccses(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const cancel = () => {
    location.reload();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>YouTube Downloader</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
      >
        <h1 style={{ color: "red" }}>please use a vpn !</h1>
      </header>
      <main className={styles.main}>
        {succses ? (
          <>
            <div className={styles.row} style={{ marginBottom: "20px" }}>
              <h3 style={{ marginRight: 10 }}>{title}</h3>
              <h4 style={{ marginRight: 20 }}>{time}</h4>
              <button className={styles.button} onClick={cancel}>
                continue
              </button>
            </div>
            <div className={styles.flex}>
              <div className={styles.row}>
                <table>
                  <thead>
                    <tr>
                      <td>Quality</td>
                      <td>Size</td>
                      <td>Download</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(videoDetail).map((key) => (
                      <Row
                        url={videoDetail[key]["url"]}
                        quality={videoDetail[key]["quality"]}
                        size={videoDetail[key]["size"]}
                        key={key}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {convert ? (
              <div className={styles.grid}>
                <span style={{ fontSize: "1.5rem", padding: 3 }}>
                  converting
                </span>
                <Loading />
              </div>
            ) : (
              <>
                <form onSubmit={send} className={styles.flex}>
                  <Input change={change} />
                  <button className={styles.button}>Convert</button>
                </form>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
