include .env # Include environment variables from .env
-include config.env # Include personal .env


install:
	# npm install
	yarn install

run:
	npm run-script debug

login-repo-one:
	docker login ${REPO_ONE_ID} --username ${REPO_ONE_ACCOUNT_ID} --password ${REPO_ONE_ACCESS_KEY}

login-aws:
	aws configure set default.region ${AWS_REGION}
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.${AWS_ID}

build-docker:
	echo "Building API"
	make login-repo-one
	# docker buildx build --platform linux/arm64 --no-cache -t ${DOCKER_IMAGE}:${VERSION} .
	docker build -f Dockerfile -t ${DOCKER_IMAGE}:${VERSION} .
	docker tag ${DOCKER_IMAGE}:${VERSION} ${DOCKER_IMAGE}:latest

push-aws:
	echo "Pushing Express Container to AWS"
	make login-aws
	docker push ${DOCKER_IMAGE}:latest

tag-release:
	git tag -a v${VERSION} -m "version ${VERSION} release"
	git push origin --tags

up:
	docker-compose up

down:
	docker-compose down

# Note - Install PM2 (This is a load balancer we use inside the docker container)
pm2-start:
	npm run pm2-dev

pm2-start-prod:
	npm run pm2-prod

# You need these to connect to the mongo instance
# Note - you put the .pem file into mongo compass so it can connect using TLS/SSL
download-aws-certs:
	wget https://truststore.pki.us-gov-west-1.rds.amazonaws.com/us-gov-west-1/us-gov-west-1-bundle.pem

connect-to-mongo:
	# Note: Install Mongo CLI first
	mongo --tlsAllowInvalidHostnames --tls --tlsCAFile us-gov-west-1-bundle.pem --username ${DB_ADM_USER} --password ${DB_ADM_PASS}

create-mongo-tunnel:
	# ssh -i lost-horizon-mongo-400.pem -NL 27017:lost-horizon-db.crlcgfdrihfs.us-gov-west-1.docdb.amazonaws.com:27017 ec2-user@15.205.150.168
	ssh -i lost-horizon-mongo-400.pem -NL 27017:lost-horizon-db.crlcgfdrihfs.us-gov-west-1.docdb.amazonaws.com:27017 ec2-user@15.205.94.71

test-tunnel:
	nc -z localhost 27017 || echo "no tunnel open"