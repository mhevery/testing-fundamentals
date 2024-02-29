import { component$, useStyles$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { maxValue, minValue, number, object, type Input } from "valibot";
import Cluster from "~/clustering/cluster";
import {
  cluster,
  convertDistanceToDegrees,
  loadDataset,
} from "~/clustering/clustering";
import STYLE from "./index.css?inline";
import {
  InitialValues,
  formAction$,
  useForm,
  valiForm$,
} from "@modular-forms/qwik";

export const head: DocumentHead = {
  title: "Chicago Traffic Accidents Clustering",
  meta: [
    {
      name: "description",
      content: "Chicago Traffic Accidents Clustering",
    },
  ],
};

const ClusterSchema = object({
  size: number([
    minValue(10, "Size must be at least 10"),
    maxValue(20000, "Size must be at most 20000"),
  ]),
  distance: number([
    minValue(100, "Distance must be at least 100"),
    maxValue(15000, "Distance must be at most 15000"),
  ]),
  minClusterSize: number([
    minValue(1, "Minimum cluster size must be at least 1"),
    maxValue(100, "Minimum cluster size must be at most 100"),
  ]),
});

type ClusterForm = Input<typeof ClusterSchema>;

export const useFormLoader = routeLoader$<InitialValues<ClusterForm>>(
  ({ sharedMap, url }) => {
    return getClusterParams(sharedMap, url.searchParams);
  }
);

export const useFormAction = formAction$<ClusterForm>(
  (values, { sharedMap }) => {
    sharedMap.set(CLUSTER_PARAMS, values);
    // Runs on server
  },
  valiForm$(ClusterSchema)
);

export const useDataset = routeLoader$(({ sharedMap, url }) => {
  const clusterParams = getClusterParams(sharedMap, url.searchParams);
  const clusters = cluster(
    loadDataset().slice(0, clusterParams.size),
    convertDistanceToDegrees(clusterParams.distance),
    clusterParams.minClusterSize
  );
  return clusters;
});

export default component$(() => {
  const formLoader = useFormLoader();
  const [loginForm, { Form, Field, FieldArray }] = useForm<ClusterForm>({
    loader: formLoader,
    action: useFormAction(),
    validate: valiForm$(ClusterSchema),
  });
  useStyles$(STYLE);
  const clusters = useDataset();
  return (
    <div>
      <h4>Chicago Traffic Accidents Clustering</h4>
      <p>
        This page clusters the first{" "}
        <span class="size">{formLoader.value.size}</span> traffic accidents in
        Chicago. The clustering is done using DBSCAN algorithm with a
        neighborhood radius of{" "}
        <span class="distance">{formLoader.value.distance}</span> meters and a
        minimum cluster size of{" "}
        <span class="min-cluster-size">{formLoader.value.minClusterSize}</span>.
      </p>
      <Form>
        <Field name="size" type="number">
          {(field, props) => (
            <div>
              <label>size:</label>
              <input {...props} type="number" value={field.value} />
              {field.error && (
                <div class={["error", props.name]}>{field.error}</div>
              )}
            </div>
          )}
        </Field>
        <Field name="distance" type="number">
          {(field, props) => (
            <div>
              <label>distance:</label>
              <input {...props} type="number" value={field.value} />
              {field.error && (
                <div class={["error", props.name]}>{field.error}</div>
              )}
            </div>
          )}
        </Field>
        <Field name="minClusterSize" type="number">
          {(field, props) => (
            <div>
              <label>min cluster size:</label>
              <input {...props} type="number" value={field.value} />
              {field.error && (
                <div class={["error", props.name]}>{field.error}</div>
              )}
            </div>
          )}
        </Field>
        <div>
          <label></label>
          <button type="submit">Cluster</button>
        </div>
      </Form>
      <p>
        <b>Clusters:</b>{" "}
        <span class="cluster-count">{clusters.value.clusters.length}</span>
        {" [ "}
        <a href="?size=20000&distance=200&minClusterSize=10">
          Show Intersections
        </a>
        {" | "}
        <a href="?size=50000&distance=100&minClusterSize=20">large set</a>
        {" ] "}
      </p>
      <Cluster dataset={clusters.value} width={500} height={500} />
    </div>
  );
});

const CLUSTER_PARAMS = "clusterParams";

function getClusterParams(
  sharedMap: Map<string, any>,
  params: URLSearchParams
): ClusterForm {
  let clusterParams = sharedMap.get(CLUSTER_PARAMS) as ClusterForm | undefined;
  if (!clusterParams) {
    clusterParams = {
      size: parseInt(params.get("size") || "5000"),
      distance: parseInt(params.get("distance") || "500"),
      minClusterSize: parseInt(params.get("minClusterSize") || "5"),
    };
  }
  return clusterParams;
}
