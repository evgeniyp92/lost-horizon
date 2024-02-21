include .env # Include environment variables from .env

install:
	# npm install
	yarn install

run:
	npm start

login-repo-one:
	docker login ${REPO_ONE_ID} --username ${REPO_ONE_ACCOUNT_ID} --password ${REPO_ONE_ACCESS_KEY}

login-aws:
	aws configure set default.region ${AWS_REGION}
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.${AWS_ID}

build-docker:
	echo "Building Client"
	# Give Permissions
	chmod 777 entrypoint_build_env.sh
	chmod 777 env.sh
	make login-repo-one
	# docker context use desktop-linux
	docker build -f Dockerfile -t ${DOCKER_IMAGE}:${VERSION} .
	# docker buildx build --platform linux/arm64 --no-cache -t ${DOCKER_IMAGE}:${VERSION} .
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