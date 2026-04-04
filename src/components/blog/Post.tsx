"use client";

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Column, Flex, Heading, Media, SmartLink, Tag, Text } from '@once-ui-system/core';
import styles from './Posts.module.scss';
import { formatDate } from '@/utils/formatDate';

interface PostProps {
    post: any;
    thumbnail: boolean;
    direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
    const metaRef = useRef<HTMLDivElement>(null);
    const [metaHeight, setMetaHeight] = useState(0);

    useEffect(() => {
        if (!metaRef.current) return;

        const node = metaRef.current;

        const updateHeight = () => {
            setMetaHeight(node.getBoundingClientRect().height);
        };

        updateHeight();

        const observer = new ResizeObserver(() => updateHeight());
        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                transition="micro-medium"
                direction={direction}
                radius="l"
                className={styles.card}
                mobileDirection="column"
                fillWidth>
                {post.metadata.image && thumbnail && (
                    <Media
                        priority
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 640px"
                        border="neutral-alpha-weak"
                        cursor="interactive"
                        radius="l"
                        src={post.metadata.image}
                        alt={'Thumbnail of ' + post.metadata.title}
                        aspectRatio="16 / 9"
                    />
                )}
                <Column
                    position="relative"
                    className={styles.content}
                    style={{ '--meta-height': `${metaHeight}px` } as CSSProperties}
                    fillWidth gap="4"
                    vertical="center">
                    <Column ref={metaRef} className={styles.meta} fillWidth gap="4">
                        <Heading
                            as="h2"
                            variant="heading-strong-l"
                            wrap="balance">
                            {post.metadata.title}
                        </Heading>
                        <Text
                            className={styles.date}
                            variant="label-default-s"
                            onBackground="neutral-weak">
                            {formatDate(post.metadata.publishedAt, false)}
                        </Text>
                        { post.metadata.tag &&
                            <Tag
                                className={`mt-12 ${styles.badge}`}
                                label={post.metadata.tag}
                                variant="neutral" />
                        }
                    </Column>
                    <Text
                        className={styles.summary}
                        variant="body-default-s"
                        onBackground="neutral-medium">
                        {post.metadata.summary}
                    </Text>
                </Column>
            </Flex>
        </SmartLink>
    );
}
