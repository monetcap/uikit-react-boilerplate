pipeline {
    agent {
    	docker {
        	image 'node:10.15.1'
        }
    }

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
            steps {
              	sh 'npm install'
              	sh 'npm run build'
            }
        }
        stage('Build Docker Image') {
        	steps {
        		script {
        			docker.build("monetcap/uikit-react-boilerplate"
        		}
        	}
        }
    }
}
