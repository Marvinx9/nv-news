import Head from "next/head";
import Image from "next/image";
import styles from "./home.module.scss";
import { SubscribeButton } from "@/components/SubscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "@/services/stripe";

interface IProps {
  product: {
    priceId: string;
    amount: number | null;
  };
}

export default function Home({ product }: IProps) {
  return (
    <>
      <Head>
        <title>Home | Mv News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image
          src="/images/Mulher.svg"
          alt="imagem de mulher programando"
          width={500}
          height={500}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1R2C5vLgFrCu8AcgJdvKLkiR");

  const product = {
    priceId: price.id,
    amount: price.unit_amount
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(price.unit_amount) / 100)
      : null,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
