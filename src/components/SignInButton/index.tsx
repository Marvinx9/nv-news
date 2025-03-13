import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        className={styles.singInButton}
        type="button"
        onClick={() => signOut()}
      >
        <FaGithub color="#04d361" />
        {session.user?.name}
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <button
      className={styles.singInButton}
      type="button"
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
