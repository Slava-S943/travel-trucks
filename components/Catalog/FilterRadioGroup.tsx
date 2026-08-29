import Image from "next/image";
import type { CamperForm, Engine, Transmission } from "@/types/camper";

import styles from "./Catalog.module.css";

type FilterValue = CamperForm | Engine | Transmission;

interface FilterRadioGroupProps {
  name: string;
  title: string;
  value: string;
  options: {
    label: string;
    value: FilterValue;
  }[];
  onChange: (value: string) => void;
}

export default function FilterRadioGroup({
  name,
  title,
  value,
  options,
  onChange,
}: FilterRadioGroupProps) {
  return (
    <fieldset className={styles.filterGroup}>
      <legend className={styles.groupTitle}>{title}</legend>

      <div className={styles.radioList}>
        {options.map((item) => (
          <label key={item.value} className={styles.radioLabel}>
            <span className={styles.radioWrapper}>
              <input
                type="radio"
                name={name}
                value={item.value}
                checked={value === item.value}
                onChange={(event) => onChange(event.target.value)}
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

              {value === item.value && (
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
  );
}
