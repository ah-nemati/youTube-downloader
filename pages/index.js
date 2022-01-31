import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Input } from "../Components/Input";
import { Loading } from "../Components/Loading";

export default function Home() {
  const [url, seturl] = useState("");
  const [succses, setsuccses] = useState(false);
  const [convert, setconvert] = useState(false);
  const [link, setlink] = useState("");
  const [title, setTitle] = useState("");

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
        .post("./api", { url })
        .then((req) => {
          console.log('url :',req.data.url);
          setlink(req.data.url);
          setTitle(req.data.title);
          setsuccses(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
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
          <div style={{display:'flex'}}>
            <h1 style={{fontSize:'1.3rem',marginRight:10}}>{title}</h1>
            <a href={link} target={"_blank"} className={styles.button} rel="noreferrer">
              Download
            </a>
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