import { describe, it, vi, Mock, beforeEach } from "vitest";
import { Fetch, GitHubAPI, delay } from "./api";

describe("GithubAPI", () => {
  describe("repository", () => {
    let fetchMock: Mock<Parameters<Fetch>, Promise<Response>>;
    let delayMock: Mock<[number], Promise<void>>;
    let api: GitHubAPI;
    beforeEach(() => {
      fetchMock = vi.fn<Parameters<Fetch>, Promise<Response>>(mockPromise);
      delayMock = vi.fn<[number], Promise<void>>(mockPromise);
      api = new GitHubAPI(fetchMock, "TEST_ACCESS_TOKEN", delayMock);
    });

    it("should repository details", async ({ expect }) => {
      const repoPromise = api.getRepository("mhevery", "qwik");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/repos/mhevery/qwik",
        {
          headers: {
            "User-Agent": "Qwik Workshop",
            "X-GitHub-Api-Version": "2022-11-28",
            Authorization: "Bearer TEST_ACCESS_TOKEN",
          },
        }
      );
      fetchMock.mock.results[0].value.resolve!(new Response('"MockResponse"'));
      expect(await repoPromise).toEqual("MockResponse");
    });

    it("should wait for some time before giving up", async ({ expect }) => {
      const repoPromise = api.getRepository("mhevery", "qwik");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/repos/mhevery/qwik",
        expect.any(Object)
      );
      expect(delayMock).toHaveBeenCalledWith(5000);
      delayMock.mock.results[0].value.resolve!();
      await delay(0);
      fetchMock.mock.results[0].value.resolve!();
      expect(await repoPromise).toEqual({ response: "TimeOut" });
    });

    it("should resolve even if before timeout", async ({ expect }) => {
      const repoPromise = api.getRepository("mhevery", "qwik");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/repos/mhevery/qwik",
        expect.any(Object)
      );
      expect(delayMock).toHaveBeenCalledWith(5000);
      fetchMock.mock.results[0].value.resolve!(new Response('"MockResponse"'));
      await delay(0);
      delayMock.mock.results[0].value.resolve!();
      expect(await repoPromise).toEqual("MockResponse");
    });
    describe("getRepositories", () => {
      it("should fetch repositories of a user", async ({ expect }) => {
        const repoPromise = api.getRepositories("mhevery");
        expect(fetchMock).toHaveBeenCalledWith(
          "https://api.github.com/users/mhevery/repos?per_page=30&page=1",
          expect.any(Object)
        );
        fetchMock.mock.results[0].value.resolve!(
          new Response('["MockResponse"]')
        );
        expect(await repoPromise).toEqual(["MockResponse"]);
      });
      it("should paginate to get all", async ({ expect }) => {
        const repoPromise = api.getRepositories("mhevery");
        expect(fetchMock).toHaveBeenCalledWith(
          "https://api.github.com/users/mhevery/repos?per_page=30&page=1",
          expect.any(Object)
        );
        fetchMock.mock.results[0].value.resolve!(
          new Response('["MockResponse"]')
        );
        expect(await repoPromise).toEqual(["MockResponse"]);
      });
    });

    it("should get most popular repository of a user", async ({ expect }) => {
      const repoPromise = api.getMostPopularRepository("mhevery");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/users/mhevery/repos?per_page=30&page=1",
        expect.any(Object)
      );
      fetchMock.mock.results[0].value.resolve!(
        new Response(
          JSON.stringify([
            { id: 1, stargazers_count: 100 },
            { id: 2, stargazers_count: 200 },
          ])
        )
      );
      expect(await repoPromise).toEqual({ id: 2, stargazers_count: 200 });
    });
  });
});

function mockPromise<T>(): Promise<T> & {
  resolve: (value: T) => void;
  reject: (error: any) => void;
} {
  let resolve!: (value: T) => void;
  let reject!: (error: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  }) as any;
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
}
