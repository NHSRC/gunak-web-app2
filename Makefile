define _deploy_qa
	ssh $1 "rm -rf /home/app/qa-server/facilities-assessment-host/app-servers/app/*"
	scp -r build/* $1:/home/app/qa-server/facilities-assessment-host/app-servers/app/
endef

define _deploy_prod
	ssh $1 "rm -rf /home/app/facilities-assessment-host/app-servers/app/*"
	scp -r build/* $1:/home/app/facilities-assessment-host/app-servers/app/
endef

define _build
	REACT_APP_TENANT=$1 npm run build
endef

clean:
	rm -rf node_modules && rm package-lock.json && rm -rf build

deps:
	npm install

post-ra-upgrade: clean
	npm install
	yarn build

#	HTTPS=true
start-nhsrc:
	PORT=6003 REACT_APP_TENANT=NHSRC yarn start

start-jss:
	PORT=6004 REACT_APP_TENANT=JSS yarn start

deploy-local:
	rm -rf ../facilities-assessment-server/app/* && cp -r build/* ../facilities-assessment-server/app/

deploy-jss-qa:
	$(call _build,JSS)
	$(call _deploy_qa,igunatmac)

deploy-nhsrc-qa:
	$(call _build,NHSRC)
	$(call _deploy_qa,gunak-other)

deploy-jss-prod:
	$(call _build,JSS)
	$(call _deploy_prod,igunatmac)

deploy-nhsrc-prod:
	$(call _build,NHSRC)
	$(call _deploy_prod,gunak-main)

test:
	CI=true npm test

build-app:
	$(call _build,NHSRC)

apply_patch:
	npx patch-package
