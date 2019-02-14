pipeline {
    agent none

    environment {
        COMMIT_MESSAGE = """${sh(
          	returnStdout: true,
          	script: "git --no-pager log --format='medium' -1 ${GIT_COMMIT}"
        )}"""
    }

    stages {
        stage('Notify Slack') {
			agent any
			steps {
				slackSend(color: '#FFFF00', message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\n```${env.COMMIT_MESSAGE}```")
			}
        }
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
    post {
        failure {
            slackSend (color: '#FF0000', message: "Failed! '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
        success {
            slackSend (color: '#00FF00', message: "Success! '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
    }
}
