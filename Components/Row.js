import React from "react";
import styles from "./../styles/Home.module.css";
export const Row = ({ url, quality, size }) => {
  return (
    <tr>
      <td>{quality!==null ? quality : '-'}</td>
      <td>{size!==null ? size +" mg" : '-'}</td>
      <td>
        <a
          href={url}
          target={"_blank"}
          className={styles.button}
          style={{ width: "100%",background:'#7fff00bf' }}
        >
          download
        </a>
      </td>
    </tr>
  );
};
