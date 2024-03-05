import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { GithubApi } from "./github-api";

export const useRepository = routeLoader$(async ({ params, env }) => {
  const user = params.user;
  const repo = params.repo;
  const token = env.get("PRIVATE_GITHUB_ACCESS_TOKEN");
  const api = new GithubApi(token);
  return await api.getRepository(user, repo);
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
