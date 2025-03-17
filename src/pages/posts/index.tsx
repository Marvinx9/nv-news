import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Mv News</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2024</time>
            <strong>Creating a Monorepo with Lerna & UYarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared build, test, and realease process.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2024</time>
            <strong>Creating a Monorepo with Lerna & UYarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared build, test, and realease process.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2024</time>
            <strong>Creating a Monorepo with Lerna & UYarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage
              multiple packages with a shared build, test, and realease process.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
