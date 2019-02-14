node {
	stages {
		stage('Notify Slack') {
			slackSend(color: '#FFFF00', message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\n```${env.COMMIT_MESSAGE}```")
		}
		stage('Checkout Repository') {
    		checkout scm
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