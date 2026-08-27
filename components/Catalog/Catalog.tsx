"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { CamperForm, Engine, Transmission } from "@/types/camper";
import { getCampers } from "@/lib/api/campers";
import CamperCard from "@/components/CamperCard/CamperCard";
import styles from "./Catalog.module.css";

const PER_PAGE = 4;

interface Filters {
  location: string;
  form: CamperForm | "";
  engine: Engine | "";
  transmission: Transmission | "";
}

const initialFilters: Filters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function Catalog() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", appliedFilters],
    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam,
        perPage: PER_PAGE,
        location: appliedFilters.location || undefined,
        form: appliedFilters.form || undefined,
        engine: appliedFilters.engine || undefined,
        transmission: appliedFilters.transmission || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

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

        <div className={styles.filters}>
          <label className={styles.filter}>
            Location
            <input
              type="text"
              value={filters.location}
              onChange={(event) =>
                handleFilterChange("location", event.target.value)
              }
              placeholder="city"
            />
          </label>

          <label className={styles.filter}>
            Body form
            <select
              value={filters.form}
              onChange={(event) =>
                handleFilterChange("form", event.target.value)
              }
            >
              <option value="">All form</option>
              <option value="alcove">Alcove</option>
              <option value="panel_van">Panel van</option>
              <option value="integrated">Integrated</option>
              <option value="semi_integrated">Semi integrated</option>
            </select>
          </label>

          <label className={styles.filter}>
            Engine
            <select
              value={filters.engine}
              onChange={(event) =>
                handleFilterChange("engine", event.target.value)
              }
            >
              <option value="">All engines</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
          </label>

          <label className={styles.filter}>
            Transmission
            <select
              value={filters.transmission}
              onChange={(event) =>
                handleFilterChange("transmission", event.target.value)
              }
            >
              <option value="">All transmissions</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </label>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.searchButton}
              onClick={handleSearch}
            >
              Search
            </button>

            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        <p className={styles.count}>Found campers: {campers.length}</p>

        <div className={styles.list}>
          {campers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>

        {hasNextPage && (
          <button
            type="button"
            className={styles.loadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            aria-busy={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        )}
      </section>
    </main>
  );
}
