"use client";

import Masonry from "react-masonry-css";
import { Column, Media, Text } from "@once-ui-system/core";
import styles from "./Gallery.module.scss";
import { gallery } from "@/resources";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.images.map((image, index) => (
        <Column key={image.src} className={styles.gridItem}>
          <Media
            priority={index < 4}
            sizes="(max-width: 720px) 100vw, 50vw"
            radius="l"
            aspectRatio={image.orientation === "horizontal" ? "3 / 2" : "2 / 3"}
            src={image.src}
            alt={image.alt}
            className={styles.image}
          />
          <Column className={styles.caption} gap="4">
            <Text className={styles.location} variant="label-strong-xs">
              {image.location}
            </Text>
            <Text variant="heading-strong-m">{image.title}</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {image.caption}
            </Text>
          </Column>
        </Column>
      ))}
    </Masonry>
  );
}
