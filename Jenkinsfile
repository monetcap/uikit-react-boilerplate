pipeline {
    agent { docker { image 'docker:18.09.2' } }

    environment {
    	COMMIT_MESSAGE = """${sh(
        	returnStdout: true,
           	script: "git --no-pager log --format='medium' -1 ${GIT_COMMIT}"
        )}"""
        COMMIT_HASH = """${sh(
             returnStdout: true,
             script: "git describe --always"
        )}"""
    }

    stages {
        stage('Build') {
        	agent { docker { image 'node:10.15.1' } }
            steps {
              	sh 'npm install'
              	sh 'npm run build'
            }
        }
        stage('Build Docker Image') {
        	steps {
        		sh 'docker ps'
        	}
        }
    }
}
