"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api/campers";
import styles from "./Catalog.module.css";

const PER_PAGE = 4;

export default function Catalog() {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["campers"],
      queryFn: ({ pageParam }) =>
        getCampers({
          page: pageParam,
          perPage: PER_PAGE,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }

        return undefined;
      },
    });

  if (isLoading) {
    return <p className={styles.message}>Loading campers...</p>;
  }

  if (isError) {
    return (
      <p className={styles.message}>
        {error instanceof Error ? error.message : "Something went wrong."}
      </p>
    );
  }

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <main className={styles.main}>
      <section className={styles.catalog}>
        <h1 className={styles.title}>Campers</h1>

        <p className={styles.count}>Found campers: {campers.length}</p>

        <div className={styles.list}>
          {campers.map((camper) => (
            <article key={camper.id} className={styles.card}>
              <h2>{camper.name}</h2>
              <p>€{camper.price}</p>
            </article>
          ))}
        </div>

        {hasNextPage && (
          <button
            type="button"
            className={styles.loadMore}
            onClick={() => fetchNextPage()}
          >
            Load More
          </button>
        )}
      </section>
    </main>
  );
}
