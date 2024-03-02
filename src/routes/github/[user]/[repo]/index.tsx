import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";

import type { paths } from "@octokit/openapi-types";

type OrgRepoResponse =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export const useRepository = routeLoader$(async ({ params, env }) => {
  const user = params.user;
  const repo = params.repo;

  const headers: HeadersInit = {
    "User-Agent": "Qwik Workshop",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = env.get("PRIVATE_GITHUB_ACCESS_TOKEN");
  if (token) {
    headers["Authorization"] =
      "Bearer " + env.get("PRIVATE_GITHUB_ACCESS_TOKEN");
  }

  const response = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
    headers,
  });
  const repository = (await response.json()) as OrgRepoResponse;
  return repository;
});

export default component$(() => {
  const repository = useRepository();
  const location = useLocation();
  return (
    <div>
      <h1>
        Repository:{" "}
        <a href={"/github/" + location.params.user}>{location.params.user}</a>/
        {location.params.repo}
      </h1>
      <div>
        <b>Repo:</b> {repository.value.name}
      </div>
      <div>
        <b>Description:</b> {repository.value.description}
      </div>
    </div>
  );
});
