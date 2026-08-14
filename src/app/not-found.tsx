"use client";

import { Box } from "@/components/primitives";
import { Link } from "@/components/custom";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.content}>
        <Box className={styles.face}>:(</Box>
        <Box className={styles.text}>
          <Box className={styles.heading}>
            page<br />not<br />found
          </Box>
          <Box className={styles.code}>Error 404</Box>
          <Link href="/" arrow className={styles.link}>
            Return home
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
