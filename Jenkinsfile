node {

	stage('Checkout') {
		environment {
        	COMMIT_MESSAGE = """${sh(
            	returnStdout: true,
                script: "git --no-pager log --format='medium' -1 ${GIT_COMMIT}"
            )}"""
        }
		slackSend(color: '#FFFF00', message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\n```${env.COMMIT_MESSAGE}```")
		checkout scm
	}
}