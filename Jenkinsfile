pipeline {
    agent {
    	docker {
        	image 'docker:18.09.2'
        }
    }

    environment {
    	COMMIT_MESSAGE = """${sh(
        	returnStdout: true,
           	script: "git --no-pager log --format='medium' -1 ${GIT_COMMIT}"
        	)}
        """
    }

    stages {
        stage('Build 1') {
        	agent {
        		docker {
        			image 'node:10.15.1'
        		}
        	}
            steps {
              	sh 'npm install'
              	sh 'npm run build'
            }
        }
		stage('Build 2') {
            steps {
              	sh 'make build'
            }
        }
    }
}
