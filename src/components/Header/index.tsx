import Image from "next/image";
import styles from "./styles.module.scss";
import { SignInButton } from "../SignInButton";
import { ActiveLink } from "../ActiveLink";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="imagem da logo do mv news"
          width={150}
          height={50}
        />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <span>Home</span>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <span>Posts</span>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
