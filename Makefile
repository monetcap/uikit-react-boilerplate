NAME   := monetcap/uikit-react-boilerplate

# variables
COMMIT := $(shell git log --pretty=format:'%h' -n 1)
BRANCH := $(shell git branch | grep \* | cut -d ' ' -f2)

# tags
LATEST_TAG := ${NAME}:latest
COMMIT_TAG    := ${NAME}:${COMMIT}
BRANCH_TAG := ${NAME}:${BRANCH}

build:
	docker build -t ${NAME} .
	@docker tag ${NAME} ${COMMIT}
	@docker tag ${NAME} ${BRANCH}

push:
	@docker push ${NAME}

login:
	@docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
