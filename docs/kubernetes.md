# Kubernetes config file

- Kubectl read these config files to create "objects". Example object types: ReplicaController, Pod, Service,... Each object has a specific purpose. For example: `Pod` has the purpose to run a container, `Service` is used to set up networking,...
- Type of object is defined with `kind` in config file.
- `ApiVersion` gives us access to a set of pre-defined objects. `apiVersion: v1` vs `apiVersion: apps/v1`

## Pod

- Pod is a grouping containers with a very similar purpose, is the smallest unit that can be deployed in kubernetes world.
- Containers inside a port are tightly coupled and must be executed with each other.
  ![image](https://i.ibb.co/f0pLYNf/Screen-Shot-2021-07-16-at-13-36-28.png)

## Services

- Setup networking in a kubernetes cluster
- Can have following sub types: clusterIP, NodePort, LoadBalancer and Ingress

### NodePort

- Exposes a container to the outside world (only good for dev purposes)
  ![image](https://i.ibb.co/hR4Zp5m/Screen-Shot-2021-07-27-at-01-35-18.png)

  # Connect to kubernetes cluster

  - Apply configuration for cluster from file: `kubectl apply -f <link-to-file>`
  - Print the status of all running pods/service: `kubectl get pods`
  - Get logs from a pod `kubectl logs <pod-name>`
