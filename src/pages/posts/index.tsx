/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import styles from "./styles.module.scss";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { GetStaticProps } from "next";

interface Post {
  uid: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Mv News</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.uid} href={`/pages/posts/${post.uid}`}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient();

  const response = await client.getAllByType("publication", {
    pageSize: 100,
  });
  const posts = response.map((post) => ({
    uid: post.uid,
    title: post.data.title,
    excerpt: getExcerpt(post.data.content),
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }));

  return { props: { posts } };
};

const getExcerpt = (content: any[]) => {
  const textNode = content.find(
    (node) => node.type === "paragraph" && node.text
  );

  return textNode ? textNode.text : "";
};
