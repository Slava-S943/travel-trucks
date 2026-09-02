"use client";

import Image from "next/image";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { CamperForm, Engine, Transmission } from "@/types/camper";

import { getCampers } from "@/lib/api/campers";

import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";

import FilterRadioGroup from "./FilterRadioGroup";
import EmptyState from "./EmptyState";

import { camperForms, engines, transmissions } from "./catalogFilters";

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

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

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

  if (isError) {
    return (
      <main className={styles.main}>
        <p className={styles.message}>
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      </main>
    );
  }

  return (
    <>
      {isLoading && <Loader />}

      <main className={styles.main}>
        <div className={styles.container}>
          <form
            className={styles.sidebar}
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            <div className={styles.locationBlock}>
              <label htmlFor="location" className={styles.locationLabel}>
                Location
              </label>

              <div className={styles.locationInputWrapper}>
                <Image
                  src={
                    filters.location ? "/icons/map.svg" : "/icons/map-gray.svg"
                  }
                  alt=""
                  width={20}
                  height={20}
                  className={styles.locationIcon}
                  aria-hidden="true"
                />

                <input
                  id="location"
                  type="text"
                  value={filters.location}
                  onChange={(event) =>
                    handleFilterChange("location", event.target.value)
                  }
                  placeholder="City"
                  className={styles.locationInput}
                />
              </div>
            </div>

            <h1 className={styles.visuallyHidden}>Camper catalog</h1>

            <h2 className={styles.filtersTitle}>Filters</h2>

            <FilterRadioGroup
              name="camper-form"
              title="Camper form"
              value={filters.form}
              options={camperForms}
              onChange={(value) => handleFilterChange("form", value)}
            />

            <FilterRadioGroup
              name="engine"
              title="Engine"
              value={filters.engine}
              options={engines}
              onChange={(value) => handleFilterChange("engine", value)}
            />

            <FilterRadioGroup
              name="transmission"
              title="Transmission"
              value={filters.transmission}
              options={transmissions}
              onChange={(value) => handleFilterChange("transmission", value)}
            />

            <div className={styles.actions}>
              <button type="submit" className={styles.searchButton}>
                Search
              </button>

              <button
                type="button"
                className={styles.clearButton}
                onClick={handleReset}
              >
                <Image
                  src="/icons/close.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
                Clear filters
              </button>
            </div>
          </form>

          <section className={styles.results} aria-label="Available campers">
            {!isLoading && campers.length === 0 ? (
              <EmptyState onClear={handleReset} />
            ) : (
              <>
                {campers.length > 0 && (
                  <ul className={styles.list}>
                    {campers.map((camper, index) => (
                      <li key={camper.id}>
                        <CamperCard camper={camper} priority={index === 0} />
                      </li>
                    ))}
                  </ul>
                )}

                {hasNextPage && (
                  <button
                    type="button"
                    className={styles.loadMore}
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    aria-busy={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                  </button>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
