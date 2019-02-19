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
            }
        }

		    stage('docker build & push') {
            agent { docker { image 'docker:18.09.2' } }
            steps {
                script {
                    def image = docker.build("${DOCKER_REPO}")

                    docker.withRegistry('', "${DOCKER_CREDENTIALS}") {
                        image.push("${GIT_BRANCH}")
                        image.push("${COMMIT_HASH}")
                    }
                }

                slackSend (color: '0db7ed', message: "Docker Image Built & Pushed - https://hub.docker.com/r/monetcap/uikit-react-boilerplate")
            }
        }

        stage('Deploy Development') {
            when { branch == 'development'}
            steps {
                sshagent(credentials: ["${RUNNER_CREDENTIALS}"]) {
                    sh "ssh -o StrictHostKeyChecking=no -l ${RUNNER_USER} ${RUNNER_HOST} docker ps"
                }
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
