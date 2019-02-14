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
    }

    stages {
        stage('npm build') {
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

              		docker.withRegistry('', "docker-registry-credentials") {
              			image.push("latest")
                        image.push("${GIT_BRANCH}")
                        image.push("${COMMIT_HASH}")
              		}
              	}
            }
        }
    }
}
