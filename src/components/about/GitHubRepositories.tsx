"use client";

import { Button, Column, Flex, Text } from "@once-ui-system/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./about.module.scss";

type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
};

type GitHubRepositoriesProps = {
  username: string;
  maxRepos?: number;
  refreshIntervalMs?: number;
};

export default function GitHubRepositories({
  username,
  maxRepos = 6,
  refreshIntervalMs = 60000,
}: GitHubRepositoriesProps) {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const endpoint = useMemo(
    () => `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`,
    [maxRepos, username],
  );

  const fetchRepositories = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(endpoint, {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`GitHub API request failed (${response.status})`);
      }

      const data = (await response.json()) as GitHubRepository[];
      setRepositories(data);
      setLastUpdated(new Date());
    } catch (caughtError) {
      setError("Could not load repositories right now. Please try refreshing.");
      console.error(caughtError);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchRepositories();

    const intervalId = window.setInterval(() => {
      fetchRepositories();
    }, refreshIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [fetchRepositories, refreshIntervalMs]);

  return (
    <Column fillWidth gap="m" marginBottom="40">
      <Flex fillWidth horizontal="space-between" vertical="center" wrap gap="12">
        <Text variant="body-default-s" onBackground="neutral-weak">
          Auto-refreshing every {Math.round(refreshIntervalMs / 1000)} seconds.
        </Text>
        <Button
          variant="secondary"
          size="s"
          label="Refresh now"
          onClick={fetchRepositories}
        />
      </Flex>

      {lastUpdated && (
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </Text>
      )}

      {isLoading ? (
        <Text variant="body-default-m">Loading repositories…</Text>
      ) : error ? (
        <Text variant="body-default-m" onBackground="danger-medium">
          {error}
        </Text>
      ) : (
        <Column as="ul" gap="12" className={styles.repoList}>
          {repositories.map((repository) => (
            <Flex
              key={repository.id}
              as="li"
              direction="column"
              gap="8"
              className={styles.repoCard}
            >
              <Flex fillWidth horizontal="space-between" vertical="center" wrap gap="8">
                <a
                  href={repository.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.repoLink}
                >
                  {repository.name}
                </a>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Updated {new Date(repository.pushed_at).toLocaleDateString()}
                </Text>
              </Flex>

              {repository.description && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {repository.description}
                </Text>
              )}

              <Flex gap="16" wrap>
                {repository.language && (
                  <Text variant="body-default-xs">Language: {repository.language}</Text>
                )}
                <Text variant="body-default-xs">Stars: {repository.stargazers_count}</Text>
                <Text variant="body-default-xs">Forks: {repository.forks_count}</Text>
              </Flex>
            </Flex>
          ))}
        </Column>
      )}
    </Column>
  );
}
