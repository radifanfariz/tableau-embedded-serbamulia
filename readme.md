# Tableau Embedded

###### Tableau Embedded apps

## How to start

```
npm i
```

**then**

#### For Development

```
npm run build:dev
```
#### For Production

```
npm run build:prod
```
or
```
npm run build:css && npm run prod
```
or
```
npm run build:css && node index.ts
```

## Route

- **By** **input:** http://localhost:8778/embed/input
- **By** **params:** http://localhost:8778/embed/params?url=<embed_of_tableu>
<br/>example: http://localhost:8778/embed/params?url=https://prod-apnortheast-a.online.tableau.com/t/serbamuliagroup/views/TACOtomotif/TAC
