pipeline {
    agent none

    stages {
        stage('Build') {
        	agent {
        		docker {
        			image 'node:10.15.1'
        		}
        	}
            steps {
              	sh 'npm install'
              	sh 'npm build'
            }
        }
    }
}
