import type { paths } from "@octokit/openapi-types";

type OrgRepoResponse =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];
type UserReposResponse =
  paths["/users/{username}/repos"]["get"]["responses"]["200"]["content"]["application/json"];
export type UserRepository = UserReposResponse[0];

export type Fetch = typeof fetch;

export function delay(time: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, time));
}

export class GitHubAPI {
  private fetch: Fetch;
  private accessToken?: string;
  private delay: (time: number) => Promise<void>;

  constructor(
    fetch: Fetch,
    accessToken?: string,
    _delay: (time: number) => Promise<void> = delay
  ) {
    this.fetch = fetch;
    this.accessToken = accessToken;
    this.delay = _delay;
  }

  async getRepository(user: string, repo: string) {
    const headers = this.createHeaders();

    return Promise.race([
      this.fetchJSON<OrgRepoResponse>(
        `https://api.github.com/repos/${user}/${repo}`,
        headers
      ),
      this.delay(5000).then(() => ({ response: "TimeOut" })),
    ]);
  }

  async getRepositories(user: string) {
    const headers = this.createHeaders();
    const perPage = 30;
    let page = 1;
    let repositories: UserRepository[] = [];
    let hasMore = true;
    while (hasMore) {
      const repos = await this.fetchJSON<UserReposResponse>(
        `https://api.github.com/users/${user}/repos?per_page=${perPage}&page=${page++}`,
        headers
      );
      repositories.push(...repos);
      hasMore = repos.length === perPage;
    }
    return repositories;
  }

  getMostPopularRepository(user: string) {
    return this.getRepositories(user).then((repos) =>
      repos.reduce((prev, curr) =>
        (prev.stargazers_count || 0) > (curr.stargazers_count || 0)
          ? prev
          : curr
      )
    );
  }

  private createHeaders() {
    const headers: HeadersInit = {
      "User-Agent": "Qwik Workshop",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (this.accessToken) {
      headers["Authorization"] = "Bearer " + this.accessToken;
    }
    return headers;
  }

  private async fetchJSON<T>(url: string, headers: HeadersInit) {
    const x = this.fetch(url, { headers });
    const response = await x;
    const repository = (await response.json()) as T;
    return repository;
  }
}
