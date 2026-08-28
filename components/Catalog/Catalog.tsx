"use client";

import Image from "next/image";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { CamperForm, Engine, Transmission } from "@/types/camper";
import { getCampers } from "@/lib/api/campers";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
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

const camperForms: {
  label: string;
  value: CamperForm;
}[] = [
  {
    label: "Alcove",
    value: "alcove",
  },
  {
    label: "Panel Van",
    value: "panel_van",
  },
  {
    label: "Integrated",
    value: "integrated",
  },
  {
    label: "Semi Integrated",
    value: "semi_integrated",
  },
];

const engines: {
  label: string;
  value: Engine;
}[] = [
  {
    label: "Diesel",
    value: "diesel",
  },
  {
    label: "Petrol",
    value: "petrol",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
  {
    label: "Electric",
    value: "electric",
  },
];

const transmissions: {
  label: string;
  value: Transmission;
}[] = [
  {
    label: "Automatic",
    value: "automatic",
  },
  {
    label: "Manual",
    value: "manual",
  },
];

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

  if (isError) {
    return (
      <main className={styles.main}>
        {" "}
        <p className={styles.message}>
          {error instanceof Error
            ? error.message
            : "Something went wrong."}{" "}
        </p>{" "}
      </main>
    );
  }

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <>
      {isLoading && <Loader />}

      <main className={styles.main}>
        {" "}
        <div className={styles.container}>
          {" "}
          <form
            className={styles.sidebar}
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            {" "}
            <div className={styles.locationBlock}>
              {" "}
              <label htmlFor="location" className={styles.locationLabel}>
                Location{" "}
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
            <h1 className={styles.filtersTitle}>Filters</h1>
            <fieldset className={styles.filterGroup}>
              <legend className={styles.groupTitle}>Camper form</legend>

              <div className={styles.radioList}>
                {camperForms.map((item) => (
                  <label key={item.value} className={styles.radioLabel}>
                    <span className={styles.radioWrapper}>
                      <input
                        type="radio"
                        name="camper-form"
                        value={item.value}
                        checked={filters.form === item.value}
                        onChange={(event) =>
                          handleFilterChange("form", event.target.value)
                        }
                        className={styles.radioInput}
                      />

                      <Image
                        src="/icons/filter-circle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.radioCircle}
                        aria-hidden="true"
                      />

                      {filters.form === item.value && (
                        <Image
                          src="/icons/filter-circle-checked.svg"
                          alt=""
                          width={14}
                          height={14}
                          className={styles.radioChecked}
                          aria-hidden="true"
                        />
                      )}
                    </span>

                    <span className={styles.radioText}>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={styles.filterGroup}>
              <legend className={styles.groupTitle}>Engine</legend>

              <div className={styles.radioList}>
                {engines.map((item) => (
                  <label key={item.value} className={styles.radioLabel}>
                    <span className={styles.radioWrapper}>
                      <input
                        type="radio"
                        name="engine"
                        value={item.value}
                        checked={filters.engine === item.value}
                        onChange={(event) =>
                          handleFilterChange("engine", event.target.value)
                        }
                        className={styles.radioInput}
                      />

                      <Image
                        src="/icons/filter-circle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.radioCircle}
                        aria-hidden="true"
                      />

                      {filters.engine === item.value && (
                        <Image
                          src="/icons/filter-circle-checked.svg"
                          alt=""
                          width={14}
                          height={14}
                          className={styles.radioChecked}
                          aria-hidden="true"
                        />
                      )}
                    </span>

                    <span className={styles.radioText}>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={styles.filterGroup}>
              <legend className={styles.groupTitle}>Transmission</legend>

              <div className={styles.radioList}>
                {transmissions.map((item) => (
                  <label key={item.value} className={styles.radioLabel}>
                    <span className={styles.radioWrapper}>
                      <input
                        type="radio"
                        name="transmission"
                        value={item.value}
                        checked={filters.transmission === item.value}
                        onChange={(event) =>
                          handleFilterChange("transmission", event.target.value)
                        }
                        className={styles.radioInput}
                      />

                      <Image
                        src="/icons/filter-circle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.radioCircle}
                        aria-hidden="true"
                      />

                      {filters.transmission === item.value && (
                        <Image
                          src="/icons/filter-circle-checked.svg"
                          alt=""
                          width={14}
                          height={14}
                          className={styles.radioChecked}
                          aria-hidden="true"
                        />
                      )}
                    </span>

                    <span className={styles.radioText}>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
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
          <section className={styles.results}>
            {!isLoading && campers.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIllustration}>
                  <Image
                    src="/images/empty-campers.png"
                    alt=""
                    width={488}
                    height={463}
                    className={styles.emptyImage}
                    aria-hidden="true"
                  />
                </div>

                <h2 className={styles.emptyTitle}>No campers found</h2>

                <div className={styles.emptyDescription}>
                  <p>We couldn`t find any campers that match your filters.</p>
                  <p>Try adjusting your search or clearing some filters.</p>
                </div>

                <div className={styles.emptyActions}>
                  <button
                    type="button"
                    className={styles.emptyClearButton}
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

                  <button
                    type="button"
                    className={styles.viewAllButton}
                    onClick={handleReset}
                  >
                    View all campers
                  </button>
                </div>
              </div>
            ) : (
              <>
                {campers.length > 0 && (
                  <div className={styles.list}>
                    {campers.map((camper) => (
                      <CamperCard key={camper.id} camper={camper} />
                    ))}
                  </div>
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
