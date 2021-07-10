# Continuous deployment

- A docker container will be built and pushed to azure container registry, when a commit is push to main branch

## Repository secrets setup

- get resource ID of resource group by running command: `az group show --name <resource-group-name>`
- create a service principle by comman: `az ad sp create-for-rbac \ --scope $groupId \ --role Contributor \ --sdk-auth`
  The output is similar to:

  ```javascript{
  "clientId": "xxxx6ddc-xxxx-xxxx-xxx-ef78a99dxxxx",
  "clientSecret": "xxxx79dc-xxxx-xxxx-xxxx-aaaaaec5xxxx",
  "subscriptionId": "xxxx251c-xxxx-xxxx-xxxx-bf99a306xxxx",
  "tenantId": "xxxx88bf-xxxx-xxxx-xxxx-2d7cd011xxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"}

  ```

- get registry id of your container registry: `registryId=$(az acr show \ --name <registry-name> \ --query id --output tsv) `
- create `AcrPush` role, which has access to push and pull to registry: `az role assignment create \ --assignee <ClientId> \ --scope $registryId \ --role AcrPush`
- Roles and credential can be checked in azure portal => container registry => IAM
- Add these secrets to repository

| AZURE_CREDENTIALS     | The entire JSON output from the service principal creation step                        |
| --------------------- | -------------------------------------------------------------------------------------- |
| REGISTRY_LOGIN_SERVER | The login server name of your registry (all lowercase). Example: myregistry.azurecr.io |
| REGISTRY_USERNAME     | The clientId from the JSON output from the service principal creation                  |
| REGISTRY_PASSWORD     | The clientSecret from the JSON output from the service principal creation              |
| RESOURCE_GROUP        | The name of the resource group you used to scope the service principal                 |

### Troubleshooting

- `The subscription is not registered to use namespace 'Microsoft.ContainerInstace`: Register your subscription with resource provider `microsoft.containerInstance`

## App service setup

- Create a new app service, choose docker container as publishment
- Choose `Azure container registry` as registry source, turn on continuous deployement
- Fill out credentials in `Settings -> Configuration`

### Troubleshooting

- Cannot fetch container registry in app service: Go to your container registry and enable admin user.

# Deploy fullstack app using Azure container registry and docker compose

## Limitation

All Docker images in the same Docker Compose or Kubernetes Config yml file need to come from the same Azure Container Registry server. This means that you may have to pull down popular images (such as nginx and Redis) from DockerHub, and tag it for ACR then push to your ACR registry server. [https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli](how to pull and push image to ACR)
