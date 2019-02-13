pipeline {
    agent {
        docker {
            image 'node:latest'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install Dependencies') {
            steps {
              sh 'npm install'
            }
        }
        stage('Code Quality Check') {
            steps {
              sh 'npm run lint'
            }
        }
        stage('Build Staging') {
            when { branch 'development' }
            steps {
                slackSend (color: '#FFFF00', message: "Started: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'\n(${env.BUILD_URL})")
                sh 'npm run build:dev'
            }
        }
        stage('Build Production') {
            when { branch 'master' }
            steps {
                slackSend (color: '#FFFF00', message: "Started: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'\n(${env.BUILD_URL})")
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy Staging') {
            when { branch 'development' }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: "47e214c3-29c0-49b5-bb72-77d143188c35", keyFileVariable: 'keyfile')]) {
                    sh 'ssh -o StrictHostKeyChecking=No -o UserKnownHostsFile=/dev/null -i ${keyfile} runner@ragnarok.monetcap.com "rm -rf /docker/staging-frontend.monetcap.com/dist"'
                    sh 'scp -o StrictHostKeyChecking=No -o UserKnownHostsFile=/dev/null -i ${keyfile} -r ./dist "runner@ragnarok.monetcap.com:/docker/staging-frontend.monetcap.com/dist"'

                    slackSend (color: '#7851a9', message: "Deployed: staging-frontend.monetcap.com | staging-frontend.monetcap.com/storybook")
                }
            }
        }
        stage('Deploy Production') {
            when { branch 'master' }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: "89b383bf-8c04-4269-9df1-8a5ab97c579f", keyFileVariable: 'keyfile')]) {
                    sh 'ssh -o StrictHostKeyChecking=No -o UserKnownHostsFile=/dev/null -i ${keyfile} runner@ragnarok.monetcap.com "rm -rf /docker/prod-frontend.monetcap.com/dist"'
                    sh 'scp -o StrictHostKeyChecking=No -o UserKnownHostsFile=/dev/null -i ${keyfile} -r ./dist "runner@ragnarok.monetcap.com:/docker/prod-frontend.monetcap.com/dist"'

                    slackSend (color: '#7851a9', message: "Deployed: prod-frontend.monetcap.com")
                }
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
