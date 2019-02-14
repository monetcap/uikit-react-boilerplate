pipeline {
    agent none

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
        	agent {
        		docker {
        			image 'docker:18.09.2'
        		}
        	}
            steps {
              	sh 'ls -al'
            }
        }
    }
}
