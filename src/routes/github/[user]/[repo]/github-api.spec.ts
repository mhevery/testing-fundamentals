import { describe, it, vi } from "vitest";
import { Fetch, GithubApi } from "./github-api";

describe("github-api", () => {
  describe("getRepository", () => {
    it("should return repository information", async ({ expect }) => {
      const fetchMock = vi.fn<Parameters<Fetch>, ReturnType<Fetch>>(
        mockPromise
      );
      const api = new GithubApi("TOKEN", fetchMock, vi.fn(mockPromise) as any);

      const responsePromise = api.getRepository("USERNAME", "REPOSITORY");

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/repos/USERNAME/REPOSITORY",
        {
          headers: {
            "User-Agent": "Qwik Workshop",
            "X-GitHub-Api-Version": "2022-11-28",
            Authorization: "Bearer TOKEN",
          },
        }
      );
      fetchMock.mock.results[0].value.resolve(new Response('"RESPONSE"'));
      expect(await responsePromise).toEqual("RESPONSE");
    });

    it("should timeout after x seconds with time out response", async ({
      expect,
    }) => {
      const fetchMock = vi.fn<Parameters<Fetch>, ReturnType<Fetch>>(
        mockPromise
      );
      const delayMock = vi.fn<[number], Promise<void>>(mockPromise);
      const api = new GithubApi("TOKEN", fetchMock, delayMock);

      const responsePromise = api.getRepository("USERNAME", "REPOSITORY");

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.github.com/repos/USERNAME/REPOSITORY",
        {
          headers: {
            "User-Agent": "Qwik Workshop",
            "X-GitHub-Api-Version": "2022-11-28",
            Authorization: "Bearer TOKEN",
          },
        }
      );
      expect(delayMock).toHaveBeenCalledWith(4000);
      delayMock.mock.results[0].value.resolve();
      expect(await responsePromise).toEqual({
        response: "timeout",
      });
    });
  });
});

function mockPromise<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: any) => void;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  }) as Promise<T> & { resolve: typeof resolve; reject: typeof reject };
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
}
