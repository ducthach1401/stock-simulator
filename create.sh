#!/bin/bash

name=$1

echo $name

cd src/modules
# dir= "$PWD/$name"

mkdir -p $name
cd $name

echo "export class ${name^}Module{}" > ${name}-module.ts
#domain
mkdir -p domain
cd domain
mkdir -p repositories
mkdir -p usecases

echo "export abstract class ${name^}Repository {}" > repositories/${name}-repository.ts
cd ..
#data
mkdir -p data
cd data
mkdir -p services
mkdir -p database
mkdir -p database/entities
mkdir -p repositories

echo "export class ${name^}RepositoryImpl extends ${name^}Repository {}" > repositories/${name}-repository-impl.ts
echo "export class ${name^}Service {}" > services/${name}-service.ts
echo "export class ${name^}Datasource {}" > database/${name}-datasource.ts
echo "export class ${name^}Entity {}" > database/entities/${name}-entity.ts
cd ..
#controller

mkdir -p app
cd app 
mkdir -p http
mkdir -p http/controllers
echo "export class ${name^}Controller {}" > http/controllers/${name}-controller.ts

npm run lint
