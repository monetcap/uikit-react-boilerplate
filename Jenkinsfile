pipeline {
    agent any

    environment {
        COMMIT_MESSAGE = """${sh(
            returnStdout: true,
            script: "git --no-pager log --format='medium' -1 ${GIT_COMMIT}"
        )}"""
        COMMIT_HASH = """${sh(
            returnStdout: true,
            script: "git describe --always"
        )}"""

        DOCKER_REPO = "monetcap/uikit-react-boilerplate"
        DOCKER_CREDENTIALS = "docker-registry-credentials"

        RUNNER_USER = "runner"
        RUNNER_HOST = "ragnarok.monetcap.com"
        RUNNER_CREDENTIALS = "runner-credentials"
    }

    stages {
        stage('Notify Slack') {
            steps {
                slackSend(color: '#FFFF00', message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\n```${env.COMMIT_MESSAGE}```")
            }
        }

        stage('npm install & build') {
            agent { docker { image 'node:10.15.1' } }
            steps {
                sh 'npm install'
                sh 'npm run build'
                slackSend (color: '#c9393b', message: "Node Dependencies Installed & Distribution Built - ${env.JOB_NAME} ${env.BUILD_NUMBER}")
            }
        }

		    stage('docker build & push') {
            agent { docker { image 'docker:18.09.2' } }
            steps {
                script {
                    def branchName = "${GIT_BRANCH}".replace('/', '_')
                    def image = docker.build("${DOCKER_REPO}")

                    docker.withRegistry('', "${DOCKER_CREDENTIALS}") {
                        image.push(branchName)
                        image.push("${COMMIT_HASH}")
                    }
                }

                slackSend (color: '#0db7ed', message: "(<https://hub.docker.com/r/monetcap/uikit-react-boilerplate/tags|Docker Image Built & Pushed to DockerHub - ${env.JOB_NAME} ${env.BUILD_NUMBER}>)")
            }
        }

        stage('Deploy Development') {
            when { branch 'development' }
            steps {
                sshagent(credentials: ["${RUNNER_CREDENTIALS}"]) {
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker stop monet-development || true"
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker rm monet-development || true"
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker pull ${DOCKER_REPO}:development"
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker run -d -p 127.0.0.1:8090:80 --name monet-development monetcap/uikit-react-boilerplate:development"
                }

                slackSend (color: '#6101e3', message: "(<https://staging-frontend.monetcap.com|Development Deployed - ${env.JOB_NAME} ${env.BUILD_NUMBER}>)")
            }
        }
        stage('Deploy Master') {
            when { branch 'master' }
            steps {
                sshagent(credentials: ["${RUNNER_CREDENTIALS}"]) {
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker stop monet-master || true"
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker rm monet-master || true"
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker pull ${DOCKER_REPO}:master"
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker run -d -p 127.0.0.1:8091:80 --name monet-master monetcap/uikit-react-boilerplate:master"
                }

                slackSend (color: '#6101e3', message: "(<https://monetcap.com|Master Deployed - ${env.JOB_NAME} ${env.BUILD_NUMBER}>)")
            }
        }
    }

    post {
        failure {
            slackSend (color: '#FF0000', message: "Build Failed! - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }

        success {
            slackSend (color: '#00FF00', message: "Success! - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}
