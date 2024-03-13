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
npm run start
```
or
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
- **By** **params:** http://localhost:8778/embed/params?url=<embed_url_of_tableau>
<br/>example: http://localhost:8778/embed/params?url=https://prod-apnortheast-a.online.tableau.com/t/serbamuliagroup/views/TACOtomotif/TAC
- **By** **params limited (v1):** http://localhost:8778/embed/params/limited/v1?employeeId=<employeed_id>&employeeNik=<employee_nik>&url=<embed_url_of_tableau>
<br/>example: http://localhost:8778/embed/params/limited/v1?employeeId=2460&employeeNik=00.23.05.0083&url=https://prod-apnortheast-a.online.tableau.com/t/serbamuliagroup/views/DashboardSMFVersion2/Dashboard1
- **By** **params limited (v2):** http://localhost:8778/embed/params/limited/v2?employeeId=<employee_id>&index=<index_of_embed_in_db>
<br/>example: http://localhost:8778/embed/params/limited/v2?employeeId=2460&index=0
- **By** **params limited (v3) (Dropdown):** http://localhost:8778/embed/params/limited/v3?employeeId=<employee_id>&employeeNik=<employee_nik>
<br/>example: http://localhost:8778/embed/params/limited/v3?employeeId=2460&employeeNik=00.23.05.0083
